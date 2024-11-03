import React from 'react';
import './EmployeeList.css';

const EmployeeList = ({ employees, selectedEmployees, onSelect, onEdit }) => {
    return (
        <div className="table-container" style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>Выбрать</th>
                        <th>ФИО</th>
                        <th>Возраст</th>
                        <th>Пол</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr
                                key={employee.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
                                }}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployees.includes(employee.id)}
                                        onChange={() => onSelect(employee.id)}
                                    />
                                </td>
                                <td onClick={() => onEdit(employee)}>{`${employee.firstName} ${employee.lastName}`}</td>
                                <td onClick={() => onEdit(employee)}>{employee.age} лет</td>
                                <td onClick={() => onEdit(employee)}>{employee.sex === 0 ? "Муж" : "Жен"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Нет сотрудников для отображения</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
