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
          firstName: row[0],
          lastName: row[1],
          email: row[2],
          mobileNumber: row[3],
          registerNumber: row[4],
          bloodGroup: row[5],
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

  const bulkRegisterData = () => {
    for (let i = 0; i < dataPreview.length; i++) {
      if (registrationStatus[i] === "awaiting") {
        const studentData = dataPreview[i];

        // Construct the request payload based on your API requirements
        const requestBody = {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          email: studentData.email,
          mobileNumber: studentData.mobileNumber,
          registerNumber: studentData.registerNumber,
          bloodGroup: studentData.bloodGroup,
        };

        // const response = fetch(``, {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(requestBody),
        // });

        var response = {ok:200}
        console.log(response)

        // Make an API call to register the student
        if (response.ok || true) {
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
      { width: 20 }, // Email
      { width: 15 }, // Mobile Number
      { width: 20 }, // Register Number
      { width: 15 }, // Blood Group
    ];

    // Center-align Mobile Number and Blood Group columns
    worksheet["!cols"][3].s = { alignment: { horizontal: "center" } }; // Mobile Number
    worksheet["!cols"][5].s = { alignment: { horizontal: "center" } }; // Blood Group

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
        "Email",
        "Mobile Number",
        "Register Number",
        "Blood Group",
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
    <div className="container mt-5">
      <h2 className="text-center">Bulk Registration</h2>

      <div>
        <p>Download the XL registration template by clicking the below button</p>
        <button type="button" className="btn btn-secondary mb-3" onClick={downloadTemplate}>Download Template</button>
      </div>

      <form>
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="file">Upload Excel file:</label>
            <input
              type="file"
              accept=".xlsx"
              name="file"
              className="form-control"
              onChange={handleFileUpload}
            />
          </div>
          <div className="col-md-8 mt-3">
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
          <h3 className="text-center">Data Preview</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Register Number</th>
                <th>Blood Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataPreview.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.firstName}</td>
                  <td>{entry.lastName}</td>
                  <td>{entry.email}</td>
                  <td>{entry.mobileNumber}</td>
                  <td>{entry.registerNumber}</td>
                  <td>{entry.bloodGroup}</td>
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
