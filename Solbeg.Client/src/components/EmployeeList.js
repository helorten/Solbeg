import React, { useState } from "react";

const EmployeeList = ({ employees, onEdit, onDelete, onDeleteSelected }) => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const handleSelectEmployee = (id) => {
        setSelectedEmployees(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(empId => empId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]); // Сбросить все выделения, если уже выбраны все сотрудники
        } else {
            setSelectedEmployees(employees.map(emp => emp.id)); // Выделить всех сотрудников
        }
    };

    const handleDeleteSelected = () => {
        if (selectedEmployees.length > 0) {
            onDeleteSelected(selectedEmployees); // Передать выбранных сотрудников для удаления
            setSelectedEmployees([]); // Очистить выделенные сотрудники после удаления
        }
    };

    return (
        <div>
            <button onClick={handleSelectAll}>
                {selectedEmployees.length === employees.length ? "Снять выделение со всех" : "Выделить всех"}
            </button>
            <button onClick={handleDeleteSelected} disabled={selectedEmployees.length === 0}>
                Удалить выделенных сотрудников
            </button>

            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        <input
                            type="checkbox"
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={() => handleSelectEmployee(employee.id)}
                        />
                        {employee.firstName} {employee.lastName}, {employee.age} лет
                        <button onClick={() => onEdit(employee)}>Редактировать</button>
                        <button onClick={() => onDelete(employee.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
