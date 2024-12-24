import { useState } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { search } from '../../features/note/note.slice';
import { SearchOutlined } from '@ant-design/icons';


const SearchInput = () => {
    const [searchVal, setSearchVal] = useState('');
    const dispatch = useDispatch();
  
    
    const getSearchValue = (e: any) => {
      setSearchVal(e.target.value);
      dispatch(search(e.target.value));
    };
  
    return(
        <div>
        <Input
          type="search"
          prefix={<SearchOutlined />}
          value={searchVal}
          placeholder="Search"
          onChange={getSearchValue}
          style={{
            width: '380px'
          }}
          onBlur={() => setSearchVal('')}
        />
      </div>


    )
}

export default SearchInput