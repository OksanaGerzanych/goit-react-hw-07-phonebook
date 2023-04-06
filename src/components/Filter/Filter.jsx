import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterContacts } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

import { FilterContainer, Text } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();
  const handleFilterChange = event =>  dispatch(setFilterContacts(event.target.value));
 
  return (
    <FilterContainer>
    <Text>
      Find contacts by name
      <input type="text" value={filter}  onChange={handleFilterChange}/>
    </Text>
  </FilterContainer>
);
}



 