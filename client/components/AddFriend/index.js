import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInputClear } from '../../customHooks/useInput';
import { Container, RowContainer, FormButton } from '../styledComponents';
import { searchFriends, updateFriends, clearSearch } from '../../redux/searchFriends';
import { addFriend } from '../../redux/friends';
import { mainOrange, textColorLight, mainLightGreen, mainDarkGreen } from '../styledComponents/globalStyles'
import styled from 'styled-components'

const SearchButton = styled(FormButton)`
  height: 36px;
`

const FriendRow = styled(RowContainer)`
  align-items: center;
`

const Button = styled.button`
  border-radius: 8px;
  background: ${mainOrange};
  color: ${textColorLight};
  font-size: .9rem;
  text-align: center;
  border: solid 1px #BC3810;
  transition: all 0.2s ease-in-out;
  height: 36px;
  font-family: "Roboto Mono";

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${mainLightGreen};
    border: solid 1px ${mainDarkGreen};
  }
`

const SearchInput = styled.input`
  height: 36px;
  margin: 6px 0;
  margin-right: 20px;
  box-shadow: 0 4px 10px 2px rgba(0,0,0,.1);
  box-sizing: border-box;
  min-width: 240px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  padding: 0 30px;
`

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
          <SearchInput type="text" placeholder="Enter name or email..." value={searchTerm} onChange={ (ev) => setTerm(ev) } />
          <SearchButton type="submit">Search</SearchButton>
          {/* { give this the same format as search on map/location} */}
        </form>
        {searched &&
          (searchResults.length
          ? searchResults.map(user => {
              return (
                <FriendRow key={ user.userId }>
                  <img className="all-friends" src="https://cdn.onlinewebfonts.com/svg/img_415067.png" />
                  <Link to={`/friends/${user.userId}`}><p className="spaced">{ user.name }</p></Link>
                  <Button type="button" onClick={ () => followFriend(user.userId) }>Follow</Button>
                </FriendRow>
              )
          })
          : <p>Sorry, no results found.</p>)
        }
      </div>
    </Container>
  )
}

export default AddFriend;
