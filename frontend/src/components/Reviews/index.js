import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { thunkGetAllReviews, thunkDeleteReview } from '../../store/reviews';
import LoginFormModal from '../LoginFormModal';
import CreateReviewModal from '../ReviewFormModal';

export default function Reviews() {
  const dispatch = useDispatch();
  const { beachId } = useParams();

  const reviews = useSelector(state => Object.values(state.reviews))
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(thunkGetAllReviews(beachId))
  },[dispatch, beachId])


  if(!reviews){
    return null
  }

  return (
    <>
      <h1>Reviews</h1>
      {!reviews.length &&
        <>
          <h2> Doest seem to be any reviews yet... why don't you start us off!</h2>
        </>
      }
      {sessionUser &&
        <CreateReviewModal />
      }
      {!sessionUser &&
      <text>
        Want to leave a review?
        <LoginFormModal />
      </text>
      }
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Review</th>
            </tr>
          {reviews.map(review => {
            return (
              <tr key={review.id}>
                <td>{review.User.username}</td>
                <td>{review.rating}⭐</td>
                <td>{review.comment}</td>
                { sessionUser?.id === review.userId &&
                  (
                    <>
                      <td>
                        <button
                          onClick={() => dispatch(thunkDeleteReview(review.id))}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </>
                  )
                }
              </tr>
              )
            })}
          </thead>
        </table>
    </>
  )
}