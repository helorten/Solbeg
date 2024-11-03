import React from "react";

const SexEnum = {
  Муж: 0,
  Жен: 1,
};

const EmployeeForm = ({
    employeeData,
    setEmployeeData,
    handleSubmit,
    isEditing,
    cancelEdit,
    error,
}) => {
    return (
        <div>
            <h2>{isEditing ? "Редактировать сотрудника" : "Добавить сотрудника"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Имя"
                value={employeeData.firstName}
                onChange={(e) => setEmployeeData({ ...employeeData, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Фамилия"
                value={employeeData.lastName}
                onChange={(e) => setEmployeeData({ ...employeeData, lastName: e.target.value })}
            />
            <input
                type="number"
                placeholder="Возраст"
                value={employeeData.age}
                onChange={(e) => setEmployeeData({ ...employeeData, age: e.target.value })}
            />
            <select
                value={employeeData.sex}
                onChange={(e) => setEmployeeData({ ...employeeData, sex: e.target.value })}
            >
                <option value="0">Муж</option>
                <option value="1">Жен</option>
            </select>
            <button onClick={handleSubmit}>{isEditing ? "Сохранить" : "Добавить"}</button>
            {isEditing && <button onClick={cancelEdit}>Отмена</button>}
        </div>
    );
};

export default EmployeeForm;