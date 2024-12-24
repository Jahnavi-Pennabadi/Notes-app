import { Tabs } from "antd"
import {
    BulbOutlined,
    DeleteOutlined,
    FolderOutlined,
    HeartOutlined,
  } from '@ant-design/icons';
import NotesApp from '../notes/notes.component';
import FoldersApp from '../folders/folders.component';
import Trash from '../trash/trash.component';
import { Wishlist } from '../wishlist/wishlist.component';
import { act, useEffect, useMemo, useState } from "react";
import TabPane from "antd/es/tabs/TabPane";
import { useDispatch, useSelector } from "react-redux";
import { notifyNotes } from "../../features/note/note.slice";
  
const TabComponent = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const notification = useSelector((s:any) => s.noteSlice.notificationData)
    const dispatch:any = useDispatch()

    const handleTabChange = (key: string) => {
        setActiveTabKey(key);
        dispatch(notifyNotes(false))
    };
    
    let tabsList =[{key : 1, label : 'Notes',icon : <BulbOutlined style={{paddingRight : '2px'}}/> , component : <NotesApp /> },
        {key : 2, label : 'Folders',icon : <FolderOutlined style={{paddingRight : '3px'}}/>, component : <FoldersApp/>},
        {key : 3, label : 'Trash',icon : <DeleteOutlined style={{paddingRight : '3px'}}/>,component : <Trash/>},
        {key : 4, label : 'Wishlist',icon : <HeartOutlined style={{paddingRight : '3px'}}/>, component : <Wishlist/>}
    ]
    
    return(
        <div>
        <Tabs activeKey={notification === true ? '1' :  activeTabKey} defaultActiveKey="Notes" onChange={handleTabChange}>
            {tabsList.map((eachItem)=>(
                <TabPane
                    tab = {
                       <span>
                        {eachItem.icon}
                        {eachItem.label}
                       </span>
                    }
                    key = {eachItem.key}>
                        {eachItem.component}
                </TabPane>
            ))}
        </Tabs>
        </div>
    )
}

export default TabComponent