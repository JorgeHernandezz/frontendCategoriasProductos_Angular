import { CategoriassComponent } from './categoriass/categoriass.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'/home',
        pathMatch: 'full'
    },

    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'categorias',
        component: CategoriassComponent,
    },
    {
        path:'categoria-form',
        component: CategoriaFormComponent,
    },
    {
        path:'productos',
        component: ProductosComponent,
    },
    {
        path:'producto-form',
        component: ProductoAddComponent,
    },
        
];
