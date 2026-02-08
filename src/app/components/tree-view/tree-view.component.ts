import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreeNodeComponent } from "../tree-node/tree-node.component";
import { TreeService } from "../../services/tree.service";
import { TreeNode } from "../../models/tree-node.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-tree-view",
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: "./tree-view.component.html",
  styleUrls: ["./tree-view.component.css"],
})
export class TreeViewComponent implements OnInit {
  treeData$!: Observable<TreeNode[]>;

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    this.treeData$ = this.treeService.treeData$;
  }

  onAddRootNode(): void {
    const label = prompt("Enter root node name:");
    if (label && label.trim()) {
      this.treeService.addNode(null, label.trim());
    }
  }
}
