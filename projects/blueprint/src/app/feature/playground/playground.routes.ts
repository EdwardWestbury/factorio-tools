import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    loadComponent: () =>
      import('./playground/playground.component').then((m) => m.PlaygroundComponent),
  },
];
