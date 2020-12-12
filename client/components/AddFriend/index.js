import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInputClear } from '../../customHooks/useInput';
import { Container, RowContainer } from '../styledComponents';
import { searchFriends, updateFriends, clearSearch } from '../../redux/searchFriends';
import { addFriend } from '../../redux/friends';

const AddFriend = () => {
  const [searchTerm, setTerm] = useInputClear('');
  const [searched, setSearched] = useState(false)
  const searchResults = useSelector(state => state.searchResults);
  const userInfo = useSelector((state) => state.loginStatus);
  const { userId } = userInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSearch());
  }, [])

  const handleSubmit = ev => {
    ev.preventDefault();
    dispatch(searchFriends(searchTerm));
    setTerm('');
    setSearched(true)
  }

  const followFriend = (friendId) => {
    dispatch(addFriend(friendId, userId));
    dispatch(updateFriends(friendId));
  }

  return (
    <Container>
      <div>
        <form id="search-form" onSubmit={ handleSubmit }>
          <input type="text" placeholder="Enter name or email..." value={searchTerm} onChange={ (ev) => setTerm(ev) } />
          <button type="submit">Search</button>
          {/* { give this the same format as search on map/location} */}
        </form>
        {searched &&
          (searchResults.length
          ? searchResults.map(user => {
              return (
                <RowContainer key={ user.userId }>
                  <img className="all-friends" src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
                  <Link to={`/friends/${user.userId}`}><p className="spaced">{ user.name }</p></Link>
                  <button type="button" onClick={ () => followFriend(user.userId) }>Follow</button>
                </RowContainer>
              )
          })
          : <p>Sorry, no results found.</p>)
        }
      </div>
    </Container>
  )
}

export default AddFriend;
