import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import "./BulkRegister.css";

const BulkRegister = () => {
  const [dataPreview, setDataPreview] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState([]);
  const [progressMessage, setProgressMessage] = useState("");
  const [progressColor, setProgressColor] = useState("text-success");
  const [adminPassword, setAdminPassword] = useState("");
  const [erroredData, setErroredData] = useState([]);

  const handleFileUpload = (e) => {
    setProgressColor('text-success')
    setErroredData([])
    setProgressMessage('')
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

        const formattedData = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          // Check if the row is not entirely empty
          if (row.some((cell) => cell && cell.trim() !== "")) {
            formattedData.push({
              first_name: row[0],
              last_name: row[1],
              username: row[2],
              email: row[3],
              registrationStatus: "awaiting",
            });
          }
        }

        setDataPreview(formattedData);
        setRegistrationStatus(new Array(formattedData.length).fill("awaiting"));
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  const handleAdminConfirmation = () => {
    if (adminPassword === "pugalkmc") {
      bulkRegisterData();
    } else {
      alert("Invalid admin password. Please try again.");
    }
  };

  const bulkRegisterData = async () => {
    setProgressMessage(
      "Registration in progress , wait some moment to complete"
    );
    for (let i = 0; i < dataPreview.length; i++) {
      if (registrationStatus[i] === "awaiting") {
        const studentData = dataPreview[i];

        // Construct the request payload based on your API requirements
        var requestBody = {
          first_name: studentData.first_name,
          last_name: studentData.last_name,
          username: studentData.username,
          email: studentData.email,
          password: "kit@123",
          password2: "kit@123",
        };
        const response = await fetch(`http://localhost:8000/alumni/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

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
          setProgressColor("text-danger");
          setProgressMessage(
            `Registration in progress , Error in some credentials`
          );
          delete requestBody.password
          delete requestBody.password2
          var get = erroredData;
          get.push(requestBody);
          setErroredData(get);
          setRegistrationStatus((prevStatus) => {
            const updatedStatus = [...prevStatus];
            updatedStatus[i] = "error";
            return updatedStatus;
          });
        }
      }
    }

    if (erroredData.length) {
      setProgressColor("text-danger");
      setProgressMessage(`Registration completed\n
      There are some registration ends with error in the data provided,\n
      No of Error Credentials: ${erroredData.length}
      Please download the Error Report`);
    } else {
      setProgressMessage("Registration completed\nNo errors");
    }
  };

  const createAndDownloadExcelFile = (data, fileName, headers) => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      headers,
      ...data.map((row) => Object.values(row)),
    ]);

    worksheet["!cols"] = [
      { width: 12 }, // First Name
      { width: 12 }, // Last Name
      { width: 15 }, // username
      { width: 30 }, // Email
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
  };

  const downloadTemplate = () => {
    const templateHeaders = [
      "First Name",
      "Last Name",
      "Username",
      "Email",
    ];
    createAndDownloadExcelFile(
      [],
      "Bulk_Registration_Template.xlsx",
      templateHeaders
    );
  };

  const downloadErroredData = () => {
    const errorReportHeaders = [
      "First Name",
      "Last Name",
      "Username",
      "Email",
    ];
    createAndDownloadExcelFile(
      erroredData,
      "registration_error_report.xlsx",
      errorReportHeaders
    );
  };

  function colorValidate(text) {
    if (text === "completed") {
      return "text-success";
    } else if (text === "error") {
      return "text-danger";
    } else {
      return "text-primary";
    }
  }

  return (
    <div className="container mt-5 text-center">
      <div>
        <p>
          Download the XL registration template by clicking the below button
        </p>
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={downloadTemplate}
        >
          Download Template
        </button>
      </div>
      <h2 className="text-center">Bulk Registration</h2>
      <form className="border border-3">
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
        <div className="container mt-4">
          <h3 className="text-center">Data Preview</h3>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="col-12 col-sm-2 col-md-2 col-lg-2">
                    First Name
                  </th>
                  <th className="col-12 col-sm-2 col-md-2 col-lg-2">
                    Last Name
                  </th>
                  <th className="col-12 col-sm-2 col-md-2 col-lg-2">
                    Username
                  </th>
                  <th className="col-12 col-sm-4 col-md-4 col-lg-4">Email</th>
                  <th className="col-12 col-sm-2 col-md-2 col-lg-2">Status</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-responsive table-scrollable">
            <table className="table table-striped">
              <tbody className="scrollable-tbody">
                {dataPreview.map((entry, index) => (
                  <tr key={index} className="row">
                    <td className="col-12 col-sm-2 col-md-2 col-lg-2">
                      {entry.first_name}
                    </td>
                    <td className="col-12 col-sm-2 col-md-2 col-lg-2">
                      {entry.last_name}
                    </td>
                    <td className="col-12 col-sm-2 col-md-2 col-lg-2">
                      {entry.username}
                    </td>
                    <td className="col-12 col-sm-4 col-md-4 col-lg-4">
                      {entry.email}
                    </td>
                    <td
                      className={
                        colorValidate(registrationStatus[index]) +
                        " col-12 col-sm-2 col-md-2 col-lg-2"
                      }
                    >
                      {registrationStatus[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className={progressColor + " mt-2"}>{progressMessage}</p>
      {erroredData.length > 0 && (
        <div className="container mt-4">
          <button
            type="button"
            className="btn btn-danger mb-2 mt-3"
            onClick={downloadErroredData}
          >
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkRegister;
