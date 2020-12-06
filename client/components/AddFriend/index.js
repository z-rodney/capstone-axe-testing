import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../customHooks/useInput';
import { Container, RowContainer } from '../styledComponents';
import { searchFriends } from '../../redux/searchFriends';
import { addFriend } from '../../redux/friends';

const AddFriend = () => {
  const [ searchTerm, setTerm ] = useInput('');
  const searchResults = useSelector(state => state.searchResults);
  const userInfo = useSelector((state) => state.loginStatus);
  const { userId } = userInfo;
  const dispatch = useDispatch();

  const handleSubmit = ev => {
    ev.preventDefault();
    dispatch(searchFriends(searchTerm));
    document.getElementById('search-form').reset();
  }

  const followFriend = (friendId) => {
    dispatch(addFriend(friendId, userId));
  }

  return (
    <Container>
      <div>
        <h2>Search Users</h2>
        <form id="search-form" onSubmit={ handleSubmit }>
          <input type="text" placeholder="Enter name or email..." onChange={ (ev) => setTerm(ev) } />
          <button type="submit">Search</button>
          {/* { give this the same format as search on map/location} */}
        </form>
        { searchResults ?
            searchResults.length === 0 ? <div>No results.</div> :
            searchResults.map(user => {
              return (
                <RowContainer key={ user.userId }>
                  <img className="all-friends" src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
                  <Link to="/friends/1"><p className="spaced">{ user.name }</p></Link>
                  <button type="button" onClick={ () => followFriend(user.userId) }>Follow</button>
                </RowContainer>
              )
            })
          : <div />
        }
      </div>
    </Container>
  )
}

export default AddFriend;
