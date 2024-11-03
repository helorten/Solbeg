import React from "react";

const EmployeeForm = ({ employeeData, setEmployeeData, handleSubmit, isEditing, cancelEdit, error }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <h2>{isEditing ? "Редактировать сотрудника" : "Добавить сотрудника"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label>Имя:</label>
                <input
                    type="text"
                    value={employeeData.firstName}
                    onChange={(e) => setEmployeeData({ ...employeeData, firstName: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Фамилия:</label>
                <input
                    type="text"
                    value={employeeData.lastName}
                    onChange={(e) => setEmployeeData({ ...employeeData, lastName: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Возраст:</label>
                <input
                    type="number"
                    value={employeeData.age}
                    onChange={(e) => setEmployeeData({ ...employeeData, age: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Пол:</label>
                <select
                    value={employeeData.sex}
                    onChange={(e) => setEmployeeData({ ...employeeData, sex: e.target.value })}
                >
                    <option value="0">Не указано</option>
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                </select>
            </div>
            <button type="submit">{isEditing ? "Сохранить изменения" : "Добавить"}</button>
            <button type="button" onClick={cancelEdit}>Отмена</button>
        </form>
    );
};

export default EmployeeForm;
