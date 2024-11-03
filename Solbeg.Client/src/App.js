import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", age: "", sex: "0" });
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

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
            setShowForm(false);
            fetchEmployees();
        } catch (error) {
            console.error("Ошибка при добавлении сотрудника:", error);
            setError("Ошибка при добавлении сотрудника.");
        }
    };

    const startEditEmployee = (employee) => {
        setEditingEmployee(employee);
        setShowForm(true);
    };

    const cancelEdit = () => {
        setEditingEmployee(null);
        setError("");
        setShowForm(false);
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
            setShowForm(false);
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

    const handleDeleteSelectedEmployees = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить выбранных сотрудников?")) return;

        try {
            await Promise.all(selectedEmployees.map(id => axios.delete(`http://localhost:44389/api/user/delete_user/${id}`)));
            setEmployees(employees.filter(emp => !selectedEmployees.includes(emp.id)));
            setSelectedEmployees([]);
        } catch (error) {
            console.error("Ошибка при удалении сотрудников:", error);
            setError("Ошибка при удалении сотрудников.");
        }
    };

    const handleSelectEmployee = (id) => {
        setSelectedEmployees(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(empId => empId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const openAddEmployeeForm = () => {
        setNewEmployee({ firstName: "", lastName: "", age: "", sex: "0" });
        setEditingEmployee(null);
        setShowForm(true);
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={openAddEmployeeForm} style={{ margin: "20px 0" }}>
                Добавить нового сотрудника
            </button>
            <button onClick={handleDeleteSelectedEmployees} disabled={selectedEmployees.length === 0} style={{ margin: "20px 0" }}>
                Удалить выделенных сотрудников
            </button>

            {showForm && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    zIndex: 1000,
                    width: "300px" // Устанавливаем фиксированную ширину формы
                }}>
                    <EmployeeForm
                        employeeData={editingEmployee || newEmployee}
                        setEmployeeData={editingEmployee ? setEditingEmployee : setNewEmployee}
                        handleSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                        isEditing={!!editingEmployee}
                        cancelEdit={cancelEdit}
                        error={error}
                    />
                </div>
            )}

            <EmployeeList
                employees={employees}
                onEdit={startEditEmployee}
                onDelete={handleDeleteEmployee}
                onDeleteSelected={handleDeleteSelectedEmployees}
                onSelect={handleSelectEmployee}
                selectedEmployees={selectedEmployees}
            />
        </div>
    );
};

export default App;
