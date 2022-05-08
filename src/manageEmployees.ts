import { employees } from './employees.json';
import { Employee } from './types';
import { getBoss } from './getEmployees';

export class TreeNode {
	subordinates: TreeNode[] = [];

	constructor(
		public name: string,
		public jobTitle: string,
		public boss: string | null,
		public salary: string
	) {
		this.checkForValidName(name);
	}

	checkForValidName(name: string): void {
		if (name.includes(`@`)) {
			const adjustedName =
				name[0].toUpperCase() + name.slice(1, name.indexOf(`@`));
			this.name = adjustedName;
		}
	}
}

const topBoss = employees.find(employee => employee.boss === null);

export const rootNode = new TreeNode(
	topBoss.name,
	topBoss.jobTitle,
	topBoss.boss,
	topBoss.salary
);

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
export function generateCompanyStructure(employeesList: Employee[]): TreeNode {
	console.log(`\nNormalizing JSON file...`);
	console.log(`Generating employee tree...\n`);

	const chainHierarchy = (treeNode: TreeNode): void => {
		employeesList.forEach((employee: Employee) => {
			if (employee.boss === treeNode.name) {
				const subordinateNode = new TreeNode(
					employee.name,
					employee.jobTitle,
					employee.boss,
					employee.salary
				);
				treeNode.subordinates.push(subordinateNode);
				chainHierarchy(subordinateNode);
			}
		});
	};

	chainHierarchy(rootNode);
	return rootNode;
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(
	tree: TreeNode,
	newEmployee: Employee,
	bossName: string
): void {
	const { name, jobTitle, boss, salary } = newEmployee;
	let isEmployeeAdded: boolean = false;

	const hireEmployeeHelper = (tree: TreeNode): void => {
		if (tree.name === bossName) {
			const newEmployeeNode: TreeNode = new TreeNode(
				name,
				jobTitle,
				boss,
				salary
			);
			tree.subordinates.push(newEmployeeNode);
			isEmployeeAdded = true;
			return;
		}
		if (tree.subordinates.length > 0 && !isEmployeeAdded) {
			tree.subordinates.forEach((sub: TreeNode) => {
				hireEmployeeHelper(sub);
			});
			return;
		}
	};

	hireEmployeeHelper(tree);

	console.log(
		`[hireEmployee]: Added new employee (${name}) with ${bossName} as their boss`
	);
	return;
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, employeeName: string): void {
	let newBossName: String;
	const fireEmployeeHelper = (tree: TreeNode): void => {
		if (tree.name === employeeName) {
			if (tree.subordinates.length > 0) {
				const oldTree: TreeNode = tree;
				const randIdx = Math.floor(Math.random() * tree.subordinates.length);
				const randomSubordinate = tree.subordinates[randIdx];
				tree.name = randomSubordinate.name;
				tree.jobTitle = randomSubordinate.jobTitle;
				tree.salary = randomSubordinate.salary;
				tree.subordinates = oldTree.subordinates.filter(
					(sub: TreeNode) => sub.name !== randomSubordinate.name
				);
				tree.subordinates.forEach((sub: TreeNode) => {
					sub.boss = tree.name;
				});
				newBossName = tree.name;
				return;
			} else {
				const bossNode = getBoss(rootNode, tree.name);
				bossNode.subordinates = bossNode.subordinates.filter(
					(sub: TreeNode) => sub.name !== tree.name
				);
				bossNode.subordinates.forEach((sub: TreeNode) => {
					sub.boss = bossNode.name;
				});
				newBossName = bossNode.name;
				return;
			}
		}
		if (tree.subordinates.length > 0) {
			tree.subordinates.forEach((sub: TreeNode) => {
				fireEmployeeHelper(sub);
			});
			return;
		}
	};

	fireEmployeeHelper(tree);

	console.log(
		`[fireEmployee]: Fired ${employeeName} and replaced with ${newBossName}`
	);
	return;
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(_: TreeNode, employeeName: string): void {
	const bossNode = getBoss(rootNode, employeeName);

	const formerBossName = bossNode.name;

	const employeeNode = bossNode.subordinates.find(
		(sub: TreeNode) => sub.name === employeeName
	);

	const employeeNodeIdx = bossNode.subordinates.indexOf(employeeNode);

	bossNode.name = employeeNode.name;

	bossNode.subordinates[employeeNodeIdx].name = formerBossName;

	bossNode.subordinates.forEach((sub: TreeNode) => {
		sub.boss = bossNode.name;
	});

	console.log(
		`[promoteEmployee]: Promoted ${employeeName} and made ${formerBossName} his subordinate`
	);
	return;
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinate and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(
	_: TreeNode,
	employeeName: string,
	subordinateName: string
): void {
	const bossNode = getBoss(rootNode, subordinateName);
	const subordinateNode = bossNode.subordinates.find(
		(sub: TreeNode) => sub.name === subordinateName
	);
	const subordinateIdx = bossNode.subordinates.indexOf(subordinateNode);

	bossNode.name = subordinateNode.name;

	bossNode.subordinates[subordinateIdx].name = employeeName;

	bossNode.subordinates.forEach((sub: TreeNode) => {
		sub.boss = bossNode.name;
	});

	console.log(
		`[demoteEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinateName})\n`
	);
	return;
}
