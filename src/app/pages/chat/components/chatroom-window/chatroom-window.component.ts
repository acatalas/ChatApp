import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  // TODO replace with Firebase data
  public dummyData = [
    {
      message: 'Sed enim velit, condimentum nec tincidunt non, elementum sed nisi.',
      createdAt: new Date(),
      sender: {
        firstName: 'Sheldon',
        lastName: 'Cooper',
        photoUrl: 'http://placekitten.com/g/100/100'
      }
    },
    {
      message: 'Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.',
      createdAt: new Date(),
      sender: {
        firstName: 'Leonard',
        lastName: 'Hofstadter',
        photoUrl: 'http://placekitten.com/g/100/100'
      }
    },
    {
      message: 'Ut eu elit sodales leo ultricies pulvinar. Fusce iaculis magna gravida tempus congue. Ut sit amet nulla sed nisi cursus mattis quis at lacus. Proin commodo, justo in elementum scelerisque, sem urna vulputate enim, ac posuere purus diam ac velit. Sed enim velit, condimentum nec tincidunt non, elementum sed nisi. Cras pharetra dui eu scelerisque pharetra. Curabitur auctor feugiat nibh eget molestie. Duis scelerisque auctor mi, sit amet efficitur magna vulputate quis. Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero. Praesent eu tristique felis. Nunc vestibulum enim et justo dignissim lacinia nec et diam.',
      createdAt: new Date(),
      sender: {
        firstName: 'Howard',
        lastName: 'Wolowitz',
        photoUrl: 'http://placekitten.com/g/100/100'
      }
    },
    {
      message: 'Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.',
      createdAt: new Date(),
      sender: {
        firstName: 'Amy',
        lastName: ' Farrah Fowler',
        photoUrl: 'http://placekitten.com/g/100/100'
      }
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
