import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Cake } from '../../cake';
import { Comment } from '../../comment';

const GET_CAKE_WITH_COMMENTS = gql`
  query GetCakeWithComments($cakeId: ObjectId) {
    cake(query:{ _id: $cakeId }) {
      name
      description
      image
      ingredients
    }
    
    comments(query: { cakeId: { _id: $cakeId } }, limit: 15, sortBy: DATE_ASC) {
      name,
      date,
      text
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($comment: CommentInsertInput!) {
    insertOneComment(data: $comment) {
      name
      text
      date
    }
  }
`;

// const LOAD_COMMENTS_OFFSET = gql`
//   query LoadCommentsWithOffset($input: CommentsOffsetInput!) {
//     CommentsOffset(input: $input) {
//       name,
//       text,
//       date
//     }
//   }
// `;

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  private id: string;
  cakeAndComments$: Observable<{ cake: Cake, comments: Comment[] }>;
  cake: Cake;
  comments: Comment[];
  cakeLoading = true;
  commentsLoading = false;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.apollo
        .watchQuery({
          query: GET_CAKE_WITH_COMMENTS,
          variables: {
            cakeId: this.id
          }
        })
        .valueChanges
        .subscribe({
          next: (result: any) => {
            this.cakeLoading = result?.loading;
            this.cake = result?.data?.cake;
            this.comments = result?.data?.comments;
            console.dir(result.data);
          }
        });
    });
  }

  addComment(comment: Comment) {
    comment.cakeId = {
      link: this.id
    };

    this.apollo.mutate({
      mutation: ADD_COMMENT,
      variables: { comment }
    })
    .subscribe((result: any) => {
      if (result?.data?.insertOneComment) {
        this.comments = [...this.comments, result?.data?.insertOneComment];
      }
    });
  }

  // loadMoreComments() {
  //   this.commentsLoading = true;

  //   const input = {
  //     cake_id: this.id,
  //     offset: this.comments.length,
  //     limit: 5,
  //     sortBy: "date",
  //     sortOrder: "DESC"
  //   }

  //   this.apollo.query({
  //     query: LOAD_COMMENTS_OFFSET,
  //     variables: { input }
  //   })
  //   .subscribe((result: any) => {
  //     this.commentsLoading = result?.data?.loading;
  //     if (result?.data?.CommentsOffset) {
  //       this.comments = [...this.comments, ...result?.data?.CommentsOffset];
  //     }
  //   });
  // }
}
