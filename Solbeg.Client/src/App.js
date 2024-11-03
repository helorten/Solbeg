import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", age: "", sex: "0" });
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:44389/api/user/get_all_users");
            setEmployees(response.data.users);
        } catch (error) {
            console.error("Ошибка при получении списка сотрудников:", error);
            setError("Ошибка при получении списка сотрудников.");
        }
    };

    const handleAddEmployee = async () => {
        if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.sex || newEmployee.age < 18 || newEmployee.age > 100) {
            setError("Пожалуйста, заполните все обязательные поля и убедитесь, что возраст находится в диапазоне 18-100.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:44389/api/user/add_new_user", {
                ...newEmployee,
                age: parseInt(newEmployee.age),
                sex: parseInt(newEmployee.sex)
            });
            setEmployees([...employees, { ...newEmployee, id: response.data.id }]);
            setNewEmployee({ firstName: "", lastName: "", age: "", sex: "0" });
            setError("");
            fetchEmployees();
        } catch (error) {
            console.error("Ошибка при добавлении сотрудника:", error);
            setError("Ошибка при добавлении сотрудника.");
        }
    };

    const startEditEmployee = (employee) => {
        setEditingEmployee(employee);
    };

    const cancelEdit = () => {
        setEditingEmployee(null);
        setError("");
    };

    const handleUpdateEmployee = async () => {
        if (!editingEmployee.firstName || !editingEmployee.lastName || !editingEmployee.sex || editingEmployee.age < 18 || editingEmployee.age > 100) {
            setError("Пожалуйста, заполните все обязательные поля и убедитесь, что возраст находится в диапазоне 18-100.");
            return;
        }

        try {
            await axios.put(`http://localhost:44389/api/user/update_user/${editingEmployee.id}`, {
                ...editingEmployee,
                age: parseInt(editingEmployee.age),
                sex: parseInt(editingEmployee.sex)
            });
            setEmployees(employees.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
            setEditingEmployee(null);
            setError("");
        } catch (error) {
            console.error("Ошибка при обновлении сотрудника:", error);
            setError("Ошибка при обновлении сотрудника.");
        }
    };

    const handleDeleteEmployee = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить этого сотрудника?")) return;

        try {
            await axios.delete(`http://localhost:44389/api/user/delete_user/${id}`);
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении сотрудника:", error);
            setError("Ошибка при удалении сотрудника.");
        }
    };

    const handleDeleteSelectedEmployees = async (selectedEmployees) => {
        try {
            await Promise.all(selectedEmployees.map(id => axios.delete(`http://localhost:44389/api/user/delete_user/${id}`)));
            fetchEmployees();
        } catch (error) {
            console.error("Ошибка при удалении сотрудников:", error);
            setError("Ошибка при удалении сотрудников.");
        }
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <EmployeeList
                employees={employees}
                onEdit={startEditEmployee}
                onDelete={handleDeleteEmployee}
                onDeleteSelected={handleDeleteSelectedEmployees}
            />

            <EmployeeForm
                employeeData={editingEmployee || newEmployee}
                setEmployeeData={editingEmployee ? setEditingEmployee : setNewEmployee}
                handleSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                isEditing={!!editingEmployee}
                cancelEdit={cancelEdit}
                error={error}
            />
        </div>
    );
};

export default App;
