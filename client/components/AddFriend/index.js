import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInputClear } from '../../customHooks/useInput';
import { BsSearch } from 'react-icons/bs';
import {
  searchFriends,
  updateFriends,
  clearSearch,
} from '../../redux/searchFriends';
import { addFriend } from '../../redux/friends';
import {
  Container,
  FriendRow,
  Button,
  SearchForm,
  SearchButton,
  SearchInput,
} from '../styledComponents';

const AddFriend = () => {
  const [searchTerm, setTerm] = useInputClear('');
  const [searched, setSearched] = useState(false);
  const searchResults = useSelector((state) => state.searchResults);
  const userInfo = useSelector((state) => state.loginStatus);
  const { userId } = userInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSearch());
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(searchFriends(searchTerm));
    setTerm('');
    setSearched(true);
  };

  const followFriend = (friendId) => {
    dispatch(addFriend(friendId, userId));
    dispatch(updateFriends(friendId));
  };

  return (
    <Container>
      <div>
        <SearchForm id="search-form" onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Enter name or email..."
            value={searchTerm}
            onChange={(ev) => setTerm(ev)}
          />
          <SearchButton type="submit">
            <BsSearch />
          </SearchButton>
        </SearchForm>
        {searched &&
          (searchResults.length ? (
            searchResults.map((user) => {
              return (
                <FriendRow key={user.userId}>
                  <img
                    className="all-friends"
                    src="https://cdn.onlinewebfonts.com/svg/img_415067.png"
                  />
                  <Link to={`/friends/${user.userId}`}>
                    <p className="spaced">{user.name}</p>
                  </Link>
                  <Button
                    type="button"
                    onClick={() => followFriend(user.userId)}
                  >
                    Follow
                  </Button>
                </FriendRow>
              );
            })
          ) : (
            <p>Sorry, no results found.</p>
          ))}
      </div>
    </Container>
  );
};

export default AddFriend;
