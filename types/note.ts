export interface Note {
  id:string,
  title:string,
  content:string,
  createdAt:string,
  updatedAt:string,
  userId:string,
  tag:string
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
