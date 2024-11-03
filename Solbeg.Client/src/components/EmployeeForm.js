import React from "react";
import "./EmployeeForm.css";

const EmployeeForm = ({ employeeData, setEmployeeData, handleSubmit, isEditing, cancelEdit, error }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="employee-form">
            <h2>{isEditing ? "Редактировать сотрудника" : "Добавить сотрудника"}</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
                <label>Имя:</label>
                <input
                    type="text"
                    value={employeeData.firstName}
                    onChange={(e) => setEmployeeData({ ...employeeData, firstName: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label>Фамилия:</label>
                <input
                    type="text"
                    value={employeeData.lastName}
                    onChange={(e) => setEmployeeData({ ...employeeData, lastName: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label>Возраст:</label>
                <input
                    type="number"
                    value={employeeData.age}
                    onChange={(e) => setEmployeeData({ ...employeeData, age: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label>Пол:</label>
                <select
                    value={employeeData.sex}
                    onChange={(e) => setEmployeeData({ ...employeeData, sex: e.target.value })}
                >
                    <option value="0">Мужской</option>
                    <option value="1">Женский</option>
                </select>
            </div>

            <div className="form-buttons">
                <button type="submit">{isEditing ? "Сохранить изменения" : "Добавить"}</button>
                <button type="button" onClick={cancelEdit} className="cancel-button">Отмена</button>
            </div>
        </form>
    );
};

export default EmployeeForm;