import { TreeNode } from './manageEmployees';

/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(tree: TreeNode, employeeName: string): TreeNode {
	const rootNode = tree;
	let bossName: string;

	const getBossName = (node: TreeNode): string => {
		const currentNode = node;
		if (currentNode.name === employeeName && !currentNode.boss) {
			return null;
		}
		if (currentNode.name === employeeName) {
			bossName = currentNode.boss;
			return bossName;
		}
		if (currentNode.subordinates.length > 0) {
			currentNode.subordinates.forEach((sub: TreeNode) => {
				getBossName(sub);
			});
		}
		return bossName;
	};

	const bossToSearch = getBossName(rootNode);
	let bossNode: TreeNode = null;

	const getBossNode = (node: TreeNode, name: string): TreeNode => {
		const currNode = node;
		if (currNode.name === name) {
			bossNode = currNode;
			return bossNode;
		}
		if (currNode.subordinates.length > 0) {
			currNode.subordinates.forEach((sub: TreeNode) => {
				getBossNode(sub, name);
			});
		}
		return bossNode;
	};

	getBossNode(rootNode, bossToSearch);
	return bossNode;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(
	tree: TreeNode,
	employeeName: string
): TreeNode[] {
	const totalSubordinates: TreeNode[] = [];

	const addSubordinates = (node: TreeNode): void => {
		const currNode = node;
		if (currNode.name === employeeName) {
			if (currNode.subordinates.length > 0) {
				currNode.subordinates.forEach((sub: TreeNode) => {
					totalSubordinates.push(sub);
				});
			}
		}
		if (currNode.subordinates.length > 0) {
			currNode.subordinates.forEach((sub: TreeNode) => {
				addSubordinates(sub);
			});
		}
	};

	addSubordinates(tree);
	return totalSubordinates;
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
// export function findLowestEmployee(
//   tree: TreeNode,
//   employeeName: string,
// ): TreeNode {}
