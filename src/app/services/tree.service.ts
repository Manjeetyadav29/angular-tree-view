import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, delay, of } from "rxjs";
import { TreeNode } from "../models/tree-node.model";

@Injectable({
  providedIn: "root",
})
export class TreeService {
  private treeDataSubject = new BehaviorSubject<TreeNode[]>([]);
  public treeData$: Observable<TreeNode[]> =
    this.treeDataSubject.asObservable();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const initialData: TreeNode[] = [
      {
        id: "1",
        label: "Level A",
        level: "A",
        hasChildren: true,
        isExpanded: false,
      },
    ];
    this.treeDataSubject.next(initialData);
  }

  // Simulate lazy loading of child nodes
  loadChildren(nodeId: string): Observable<TreeNode[]> {
    const children: TreeNode[] = [
      {
        id: `${nodeId}-1`,
        label: "Level A",
        level: "A",
        parentId: nodeId,
        hasChildren: true,
        isExpanded: false,
      },
      {
        id: `${nodeId}-2`,
        label: "Level A",
        level: "A",
        parentId: nodeId,
        hasChildren: false,
      },
    ];

    // Simulate API call delay
    return of(children).pipe(delay(500));
  }

  toggleNode(nodeId: string): void {
    const data = this.treeDataSubject.value;
    this.toggleNodeRecursive(data, nodeId);
    this.treeDataSubject.next([...data]);
  }

  private toggleNodeRecursive(nodes: TreeNode[], nodeId: string): boolean {
    for (const node of nodes) {
      if (node.id === nodeId) {
        node.isExpanded = !node.isExpanded;
        return true;
      }
      if (node.children && this.toggleNodeRecursive(node.children, nodeId)) {
        return true;
      }
    }
    return false;
  }

  setChildren(nodeId: string, children: TreeNode[]): void {
    const data = this.treeDataSubject.value;
    this.setChildrenRecursive(data, nodeId, children);
    this.treeDataSubject.next([...data]);
  }

  private setChildrenRecursive(
    nodes: TreeNode[],
    nodeId: string,
    children: TreeNode[],
  ): boolean {
    for (const node of nodes) {
      if (node.id === nodeId) {
        node.children = children;
        return true;
      }
      if (
        node.children &&
        this.setChildrenRecursive(node.children, nodeId, children)
      ) {
        return true;
      }
    }
    return false;
  }

  addNode(parentId: string | null, newNodeLabel: string): void {
    const data = this.treeDataSubject.value;
    const newNode: TreeNode = {
      id: `node-${Date.now()}`,
      label: newNodeLabel,
      level: "A",
      hasChildren: false,
      isExpanded: false,
    };

    if (parentId === null) {
      data.push(newNode);
    } else {
      this.addNodeRecursive(data, parentId, newNode);
    }

    this.treeDataSubject.next([...data]);
  }

  private addNodeRecursive(
    nodes: TreeNode[],
    parentId: string,
    newNode: TreeNode,
  ): boolean {
    for (const node of nodes) {
      if (node.id === parentId) {
        if (!node.children) {
          node.children = [];
        }
        newNode.parentId = parentId;
        node.children.push(newNode);
        node.hasChildren = true;
        node.isExpanded = true;
        return true;
      }
      if (
        node.children &&
        this.addNodeRecursive(node.children, parentId, newNode)
      ) {
        return true;
      }
    }
    return false;
  }

  removeNode(nodeId: string): void {
    const data = this.treeDataSubject.value;
    this.removeNodeRecursive(data, nodeId);
    this.treeDataSubject.next([...data]);
  }

  private removeNodeRecursive(
    nodes: TreeNode[],
    nodeId: string,
    parentNode?: TreeNode,
  ): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nodeId) {
        nodes.splice(i, 1);
        if (parentNode && nodes.length === 0) {
          parentNode.hasChildren = false;
          parentNode.children = undefined;
        }
        return true;
      }
      if (
        nodes[i].children &&
        this.removeNodeRecursive(nodes[i].children!, nodeId, nodes[i])
      ) {
        return true;
      }
    }
    return false;
  }

  updateNodeLabel(nodeId: string, newLabel: string): void {
    const data = this.treeDataSubject.value;
    this.updateNodeLabelRecursive(data, nodeId, newLabel);
    this.treeDataSubject.next([...data]);
  }

  private updateNodeLabelRecursive(
    nodes: TreeNode[],
    nodeId: string,
    newLabel: string,
  ): boolean {
    for (const node of nodes) {
      if (node.id === nodeId) {
        node.label = newLabel;
        return true;
      }
      if (
        node.children &&
        this.updateNodeLabelRecursive(node.children, nodeId, newLabel)
      ) {
        return true;
      }
    }
    return false;
  }

  moveNode(
    draggedNodeId: string,
    targetParentId: string | null,
    position: number,
  ): void {
    const data = this.treeDataSubject.value;

    // Find and remove the dragged node
    const draggedNode = this.findAndRemoveNode(data, draggedNodeId);

    if (!draggedNode) return;

    // Insert at new position
    if (targetParentId === null) {
      data.splice(position, 0, draggedNode);
    } else {
      this.insertNodeAtPosition(data, targetParentId, draggedNode, position);
    }

    this.treeDataSubject.next([...data]);
  }

  private findAndRemoveNode(
    nodes: TreeNode[],
    nodeId: string,
    parentNode?: TreeNode,
  ): TreeNode | null {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nodeId) {
        const [removed] = nodes.splice(i, 1);
        if (parentNode && nodes.length === 0) {
          parentNode.hasChildren = false;
          parentNode.children = undefined;
        }
        return removed;
      }
      if (nodes[i].children) {
        const found = this.findAndRemoveNode(
          nodes[i].children!,
          nodeId,
          nodes[i],
        );
        if (found) return found;
      }
    }
    return null;
  }

  private insertNodeAtPosition(
    nodes: TreeNode[],
    parentId: string,
    node: TreeNode,
    position: number,
  ): boolean {
    for (const n of nodes) {
      if (n.id === parentId) {
        if (!n.children) {
          n.children = [];
        }
        node.parentId = parentId;
        n.children.splice(position, 0, node);
        n.hasChildren = true;
        n.isExpanded = true;
        return true;
      }
      if (
        n.children &&
        this.insertNodeAtPosition(n.children, parentId, node, position)
      ) {
        return true;
      }
    }
    return false;
  }
}
