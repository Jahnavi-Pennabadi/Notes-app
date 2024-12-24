import { List, Empty } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import WishlistCard from "../wishlistCard/wishlistcard.component";
import SearchInput from "../searchInput/searchinput.component";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import SkeletonWishlistCard from "../wishlistSkeleton/wishlistskeleton";

const selectWishlistNotes = createSelector(
  [(state: any) => state.noteSlice.notesList],
  (notesList) => notesList.filter((item: any) => item.isFavorite && !item.isActive)
)

export const Wishlist = () => {
  const notesList = useSelector(selectWishlistNotes);
  const searchValue = useSelector((state: any) => state.noteSlice.searchVal);
  let loading = useSelector((s:any) => s.noteSlice.loading)

  const filteredWishlist = useMemo( () => notesList.filter(
    (item: any) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.content.toLowerCase().includes(searchValue.toLowerCase())
   ),[searchValue,notesList]);

  return (
    <div>
      <div className="trash-search-container">
      <h1>Wishlist</h1>
      <SearchInput/>
      </div>
      {loading ? <SkeletonWishlistCard/> : 
      filteredWishlist.length > 0 ? (        
      <List
        grid={{ gutter: 16, column: 3 }}
          dataSource={filteredWishlist}
          renderItem={(item: any) => (
            <WishlistCard item = {item}/>
          )}
        />
      ) : (
        <Empty description="No notes added to wishlist" />
      )}
    </div>
  );
};
