document.addEventListener("DOMContentLoaded", function() {
    const employeeForm = document.getElementById("employeeForm");
    const employeeTableBody = document.getElementById("employeeTable").querySelector("tbody");
    const submitButton = document.getElementById("submitButton");
    const employeeTable = document.getElementById("employeeTable");
    const tableHeader = document.getElementById("tableHeader");

    // Carregar funcionários do sessionStorage
    function loadEmployees() {
        const employees = JSON.parse(sessionStorage.getItem("employees")) || [];
        employees.forEach((employee, index) => {
            addEmployeeRow(employee, index);
        });
    }

    // Adicionar linha na tabela
    function addEmployeeRow(employee, index) {
        const row = document.createElement("tr");
        row.className = index % 2 === 0 ? "zebra" : "";
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.salary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td>${employee.gender}</td>
        `;
        employeeTableBody.appendChild(row);
    }

    // Validar e adicionar funcionário
    employeeForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const age = parseInt(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const salary = parseFloat(document.getElementById("salary").value);

        if (!name || name.split(' ').length < 2) {
            alert("Nome completo deve conter nome e sobrenome.");
            return;
        }
        if (age < 15 || age > 120) {
            alert("Idade deve ser entre 15 e 120 anos.");
            return;
        }
        if (salary < 1500 || salary > 15000) {
            alert("Salário deve ser entre R$1.500,00 e R$15.000,00.");
            return;
        }

        const employees = JSON.parse(sessionStorage.getItem("employees")) || [];
        if (employees.length < 50) {
            employees.push({ name, age, gender, salary });
            sessionStorage.setItem("employees", JSON.stringify(employees));

            // Se atingirmos 50 funcionários, exiba a tabela e o cabeçalho
            if (employees.length === 50) {
                tableHeader.style.display = "block";
                employeeTable.style.display = "table"; // Torna a tabela visível
                employees.forEach((employee, index) => addEmployeeRow(employee, index));
            }
        } else {
            alert("Limite de 50 funcionários alcançado.");
        }

        employeeForm.reset();
        if (employees.length >= 50) {
            submitButton.textContent = "Recomeçar";
            employeeForm.querySelectorAll("input, select").forEach(input => input.disabled = true);
        }
    });

    loadEmployees();
});
