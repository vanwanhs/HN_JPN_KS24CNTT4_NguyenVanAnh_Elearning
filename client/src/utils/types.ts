export interface Subject{
    id:number;
    subject_name:string;
    created_at:string;
    status:string;
}
export interface Lesson{
      id:number;
      subject_id: number;
      lesson_name: string;
      time: number;
      status:string;
      created_at: string
   
}