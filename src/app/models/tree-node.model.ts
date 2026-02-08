export interface TreeNode {
  id: string;
  label: string;
  level: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  isLoading?: boolean;
  hasChildren?: boolean;
  parentId?: string;
}
