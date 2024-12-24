import { CloseOutlined } from "@ant-design/icons"
import { Button, List, Tooltip } from "antd"
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePartialNote } from "../../features/note/note.slice";
import { images } from "../../assets/images";
import { parseContent } from "../parsecontent/parsecontent";
import { toast } from "react-toastify";



const WishlistCard = ({ item }: any) => {
  let dispatch: any = useDispatch()
  console.log('title', item.title)

  const removeFromFavourites =
    (id: any) => {
      dispatch(updatePartialNote({ id, data: { isFavorite: false } }));
      
    }

  const content = typeof item?.content === 'string' ? item.content : '';

  const parsedNotes = parseContent(content)
  let loading = useSelector((s:any) => s.noteSlice.loading)


  return (
    <List.Item

      key={item.id}

    >
      <div style={{
        display: 'flex', alignItems: 'center', border: '1px solid #e6e6e6', justifyContent: 'space-between',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',width : '100%'
        , height: '90px', borderRadius: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={images.notesImage}
            alt="No notes"
            style={{ width: 60, height: 60, paddingLeft: '9px', marginRight: '15px' }}
          />

          <p style={{ fontWeight: '600' ,fontSize : '17px'}}>{item.title}</p>
        </div>
        <div>

          <Tooltip title="Remove from Favourites">
            <Button
              type="text"
              icon={<CloseOutlined />}
              style={{ paddingRight: '10px' }}
              onClick={() => removeFromFavourites(item.id)}
            />
          </Tooltip>
        </div>
      </div>

    </List.Item>


  )
}

export default WishlistCard