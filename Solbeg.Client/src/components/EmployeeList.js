import React from 'react';
import './EmployeeList.css'; // Импортируем CSS файл для стилизации

const EmployeeList = ({ employees, selectedEmployees, onSelect, onEdit }) => {
    return (
        <div className="table-container" style={{ maxHeight: '250px', overflowY: 'auto' }}> {/* Добавили прокрутку */}
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
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9', // Цвет для четных и нечетных строк
                                }}
                                onClick={() => onEdit(employee)} // Обработчик клика на строку
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployees.includes(employee.id)}
                                        onChange={() => onSelect(employee.id)}
                                    />
                                </td>
                                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                                <td>{employee.age} лет</td>
                                <td>{employee.sex === "0" ? "Муж" : "Жен"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Нет сотрудников для отображения</td> {/* Сообщение при отсутствии сотрудников */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
