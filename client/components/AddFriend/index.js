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


/**
 * Component contains form to search for and add new friends.
 * Search results return new users not in the existing friends list with button to Follow.
 *
 * @return {*}
 */
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

  /**
   * On submit, search all users for the specific term.
   * Set the text box field to blank and mark local state that a term has been searched.
   *
   * @param {*} ev
   */
  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(searchFriends(searchTerm));
    setTerm('');
    setSearched(true);
  };

  /**
   * Adds user with given ID to the current user's follow list.
   *
   * @param {*} friendId
   */
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
