import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";

const BulkRegister = () => {
  const [file, setFile] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState([]);
  const [adminPassword, setAdminPassword] = useState("");
  const [registrationInProgress, setRegistrationInProgress] = useState(false);
  const [erroredData, setErroredData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: "binary" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
          header: 1,
          skipHeader: 1,
        });
        const formattedData = jsonData.map((row) => ({
          first_name: row[0],
          last_name: row[1],
          username: row[2],
          email: row[3],
          registrationStatus: "awaiting",
        }));
        setDataPreview(formattedData);
        setRegistrationStatus(new Array(formattedData.length).fill("awaiting"));
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  const handleAdminConfirmation = () => {
    if (adminPassword === "pugalkmc") {
      setRegistrationInProgress(true);
      bulkRegisterData();
    } else {
      alert("Invalid admin password. Please try again.");
    }
  };

  const bulkRegisterData = async () => {
    for (let i = 0; i < dataPreview.length; i++) {
      if (registrationStatus[i] === "awaiting") {
        const studentData = dataPreview[i];

        // Construct the request payload based on your API requirements
        const requestBody = {
          first_name: studentData.first_name,
          last_name: studentData.last_name,
          username: studentData.username,
          email: studentData.email,
          password:"kit@123",
          password1:"kit@123"
        };

        console.log(requestBody)
        const response = await fetch(`http://127.0.0.1:8000/alumni/register/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        // var response = {ok:200}
        console.log(response)

        // Make an API call to register the student
        if (response.ok) {
          // Simulating a successful registration with a timeout
          setTimeout(() => {
            setRegistrationStatus((prevStatus) => {
              const updatedStatus = [...prevStatus];
              updatedStatus[i] = "completed";
              return updatedStatus;
            });
          }, 1000);
        } else {
          console.error("Error during registration:", response.message);
          setRegistrationStatus((prevStatus) => {
            const updatedStatus = [...prevStatus];
            updatedStatus[i] = "error";
            return updatedStatus;
          });
        }
      }
    }
  };

  const createAndDownloadExcelFile = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths
    worksheet["!cols"] = [
      { width: 12 }, // First Name
      { width: 12 }, // Last Name
      { width: 15 }, // username
      { width: 20 } // Email
    ];

    // worksheet["!cols"][3] = { alignment: { horizontal: "center" } };
    // worksheet["!cols"][5] = { alignment: { horizontal: "center" } };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
  };

  // Function to create and download the registration template Excel file
  const downloadTemplate = () => {
    const templateData = [
      [
        "First Name",
        "Last Name",
        "username",
        "Email"
      ],
    ];

    createAndDownloadExcelFile(templateData, "Bulk_Registration_Template.xlsx");
  };

  // Function to create and download the errored data Excel file
  const downloadErroredData = () => {
    createAndDownloadExcelFile(erroredData, "errored_data.xlsx");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5 text-center"> {/* Added 'text-center' class */}
  
      <div>
        <p>Download the XL registration template by clicking the below button</p>
        <button type="button" className="btn btn-secondary mb-3" onClick={downloadTemplate}>Download Template</button>
      </div>

      <h2 className="text-center">Bulk Registration</h2>
      <form className="border">
        <div className="row justify-content-center">
          <div className="col-md-5 mt-2">
            <label htmlFor="file">Upload Excel file:</label>
            <input
              type="file"
              accept=".xlsx"
              name="file"
              className="form-control"
              onChange={handleFileUpload}
            />
          </div>
          <div className="col-md-5 mt-2">
            <label htmlFor="admin_password">Admin Password:</label>
            <input
              type="password"
              name="admin_password"
              className="form-control"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
        </div>
  
        <button
          type="button"
          className="btn btn-primary mb-2 mt-3"
          onClick={handleAdminConfirmation}
        >
          Start Registration
        </button>
      </form>
  
      {dataPreview.length > 0 && (
        <div>
          <h3 className="text-center mt-4">Data Preview</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>username</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataPreview.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.first_name}</td>
                  <td>{entry.last_name}</td>
                  <td>{entry.username}</td>
                  <td>{entry.email}</td>
                  <td>{registrationStatus[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  
      {registrationInProgress && (
        <div className="text-center mt-5">
          <p>Registration is in progress. Please wait...</p>
        </div>
      )}
    </div>
  );  
};

export default BulkRegister;
