import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TreeNode } from "../../models/tree-node.model";
import { TreeService } from "../../services/tree.service";

@Component({
  selector: "app-tree-node",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./tree-node.component.html",
  styleUrls: ["./tree-node.component.css"],
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;
  @Input() level: number = 0;
  @Output() nodeToggle = new EventEmitter<string>();

  isEditing = false;
  editLabel = "";
  draggedOver = false;

  constructor(private treeService: TreeService) {}

  onToggle(event: Event): void {
    event.stopPropagation();

    if (!this.node.isExpanded && this.node.hasChildren && !this.node.children) {
      // Lazy load children
      this.node.isLoading = true;
      this.treeService.loadChildren(this.node.id).subscribe((children) => {
        this.treeService.setChildren(this.node.id, children);
        this.node.isLoading = false;
      });
    }

    this.treeService.toggleNode(this.node.id);
  }

  onAdd(event: Event): void {
    event.stopPropagation();
    const label = prompt("Enter node name:");
    if (label && label.trim()) {
      this.treeService.addNode(this.node.id, label.trim());
    }
  }

  onRemove(event: Event): void {
    event.stopPropagation();
    const confirmed = confirm(
      `Are you sure you want to delete "${this.node.label}" and all its children?`,
    );
    if (confirmed) {
      this.treeService.removeNode(this.node.id);
    }
  }

  onDoubleClick(): void {
    this.isEditing = true;
    this.editLabel = this.node.label;
  }

  onEditBlur(): void {
    if (this.editLabel.trim() && this.editLabel !== this.node.label) {
      this.treeService.updateNodeLabel(this.node.id, this.editLabel.trim());
    }
    this.isEditing = false;
  }

  onEditKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.onEditBlur();
    } else if (event.key === "Escape") {
      this.isEditing = false;
    }
  }

  // Drag and Drop handlers
  onDragStart(event: DragEvent): void {
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("nodeId", this.node.id);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
    this.draggedOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.draggedOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.draggedOver = false;

    if (event.dataTransfer) {
      const draggedNodeId = event.dataTransfer.getData("nodeId");

      if (draggedNodeId && draggedNodeId !== this.node.id) {
        // Drop as a child of this node
        this.treeService.moveNode(draggedNodeId, this.node.id, 0);
      }
    }
  }

  getIndentStyle(): string {
    return `${this.level * 24}px`;
  }
}
