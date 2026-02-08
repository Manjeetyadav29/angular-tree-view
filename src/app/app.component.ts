import { Component } from '@angular/core';
import { TreeViewComponent } from './components/tree-view/tree-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeViewComponent],
  template: '<app-tree-view></app-tree-view>',
  styles: []
})
export class AppComponent {
  title = 'tree-view-angular';
}
