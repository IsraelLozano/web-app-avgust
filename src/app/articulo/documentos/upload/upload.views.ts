import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.views.html',
  styleUrls: ['./upload.views.scss'],
})
export class UploadViews implements OnInit {
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private fileService: FileService, private dialogService: DialogService) {}

  ngOnInit() {}

  uploadFile = (files: string | any[]) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    var extension = fileToUpload.name.substr(fileToUpload.name.lastIndexOf('.'));

    if (
      extension.toLowerCase() !== '.pdf' &&
      extension.toLowerCase() !== '.docx' &&
      extension.toLowerCase() !== '.jpg'
    ) {
      this.dialogService.info({
        message: 'Formatos no valido',
        title: 'Información',
        button: { text: 'Cerrar' },
      });
      return;
    }

    this.fileService.upload(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / Number(event.total));
        else if (event.type === HttpEventType.Response) {
          this.message = 'Archivo subido';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  };
}
