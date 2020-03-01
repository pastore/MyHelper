import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoWhiteSpaceDirective } from '../directives/no-whitespace.directive';
import { LoaderComponent } from '../loader/loader.component';
import { MhMaterialModule } from './mh-material.module';

@NgModule({
    declarations: [
    LoaderComponent,
    NoWhiteSpaceDirective
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
      NoWhiteSpaceDirective
    ]
})

export class CoreModule { }
