import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoWhiteSpaceDirective } from '../directives/no-whitespace.directive';
import { LoaderComponent } from '../loader/loader.component';
import { MhMaterialModule } from './mh-material.module';
import { CopyrightComponent } from '../components/copyright/copyright.component';

@NgModule({
    declarations: [
    LoaderComponent,
    NoWhiteSpaceDirective,
    CopyrightComponent
  ],
   imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MhMaterialModule
   ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      MhMaterialModule,
      LoaderComponent,
      NoWhiteSpaceDirective,
      CopyrightComponent
    ]
})

export class CoreModule { }
