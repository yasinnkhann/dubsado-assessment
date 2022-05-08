import { employees } from './employees.json';
import {
	rootNode,
	generateCompanyStructure,
	hireEmployee,
	fireEmployee,
	promoteEmployee,
	demoteEmployee,
} from './manageEmployees';
import { getBoss, getSubordinates } from './getEmployees';

// Main code goes here
(function main() {
	generateCompanyStructure(employees);

	const employeeToHire = {
		name: `Jeb`,
		jobTitle: `Software Engineer`,
		boss: `Sarah`,
		salary: `45000`,
	};

	hireEmployee(rootNode, employeeToHire, employeeToHire.boss);
	fireEmployee(rootNode, `Alicia`);
	promoteEmployee(rootNode, `Jared`);
	demoteEmployee(rootNode, `Xavier`, `Maria`);

	function printGetBossLine(boss: string) {
		console.log(
			`[getBoss]: ${boss}'s boss is ${getBoss(rootNode, `${boss}`).name}`
		);
	}
	printGetBossLine(`Bill`);

	function printGetSubordinatesLine(boss: string) {
		console.log(
			`[getSubordinate]: ${boss}'s subordinates are ${getSubordinates(
				rootNode,
				`${boss}`
			)
				.map(subordinate => subordinate.name)
				.join(`, `)}\n`
		);
	}
	printGetSubordinatesLine(`Maria`);
})();
