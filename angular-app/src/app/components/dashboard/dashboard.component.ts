import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotesService } from '../../services/notes.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  noteList:any=[];
  showAddFrom:Boolean=false;
  notesModel = {
    id:'',
    title:'',
    description:''
  }
  message:any={
    type:'',
    text:''
  }
  public notesForm:FormGroup;

  constructor(
    public notesService:NotesService,
    public fb: FormBuilder,
  ) {
    this.notesForm = fb.group({
      title: ['', Validators.required],
      description: ['']
    })
   }

  ngOnInit() {
    this.getNotes();
  }
  getNotes(){
    this.notesService.getNotes().subscribe(
      response => {
        this.noteList = response.data;
    },
    error => {
      console.log(error);
    });
  }

  addForm(){
    this.showAddFrom=true;
    this.resetFrom();
  }

  resetFrom(){
    this.notesModel = {
      id:'',
      title:'',
      description:''
    }
    this.notesForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    })
  }

  getNotesDetail(note){
    this.showAddFrom=true;
    this.notesModel ={
      id:note._id,
      title:note.title,
      description:note.description
    }
  }

  saveNotes(){
    if(this.notesForm.controls.title.status=='VALID' && this.notesForm.controls.description.status=='VALID'){
      this.notesService.saveNotes(this.notesModel).subscribe(
        response => {
          console.log(response);
          this.resetFrom();
          this.getNotes();

      },
      error => {
  
      });
    }
  }

  deleteNotes(noteId){
    this.notesService.deleteNotes(noteId).subscribe(
      response => {
        console.log(response);
          this.getNotes();
          this.resetFrom();
          this.showAddFrom=false;
      },
      error => {

      }
    );
  }


}
