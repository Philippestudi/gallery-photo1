import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Photo } from '../../models/photo.model';
import { GalleryService } from '../../services/gallery.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [AsyncPipe,NgFor,NgIf,RouterLink],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  photoData!: Observable<Photo[]>;
  selectedImage: Photo | null = null;

  constructor(
    private firestore: Firestore,
    private router: Router,
    private galleryService: GalleryService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'photos');
    console.log('collectionInstance',collectionInstance);
    this.photoData! = collectionData(collectionInstance, { idField: 'id' }).pipe(
      map(dataArray => dataArray.map(data => ({
        id: data['id'],
        title: data['title'],
        description: data['description'],
        imageUrl: data['imageUrl'],
        likes: data['likes']
      }) as Photo))
    );
  }

  onLike(photo: Photo) {
    this.galleryService.likePhoto(photo);
  }


  navigateToDetails(id: string) {
        this.router.navigate(['/image-details', id]);
      }
}
