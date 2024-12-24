import React, { useState } from 'react';
import { Button, Card, List, Modal, Popover, Skeleton, Tooltip } from 'antd';
import NoteActions from '../noteactions/noteactions.component';

import './note.css';
import { parseContent } from '../parsecontent/parsecontent';
import { useSelector } from 'react-redux';

import { AddNote } from '../addEditNote/addEditNote';

const Note = React.memo(({ item }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
    
  const [currentNote, setCurrentNote] = useState<any | null>(null);
   
  const [isHovered, setIsHovered] = useState(false);

  const content = typeof item?.content === 'string' ? item.content : '';
  const parsedNotes = parseContent(content);
  const extractContent = (htmlString: string): string => {
    if (!htmlString) return ''; 

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlString, 'text/html');
    
    const paragraph = htmlDoc.querySelector('p');
    if (paragraph) {
        let text = paragraph.textContent?.trim() || ''
        let finalText = text.length > 35 ? `${text?.slice(0,35)}...` : text
        return finalText
    }
    
    let ParaText = htmlDoc.body.textContent?.trim() || ''
    let finalParaText = ParaText.length > 35 ? `${ParaText?.slice(0,54)}...` : ParaText
    return finalParaText
};

let contents  = extractContent(content)
 
  const notifications = useSelector((s: any) => s.notificationSlice.notificationToParticularUser);
  const isLoading = useSelector((state: any) => state.noteSlice.loading);
  let notifcationsData = useSelector((s: any) => s.notificationSlice.displayNotifications);
  let combinedNotifications = [...notifications, ...notifcationsData];

  const isSharedNote = combinedNotifications.reduceRight((result: any, current: any) => {
    if (result === null && current.ItemId === item.id) {
      return current;
    }
    return result;
  }, null);

  
  const showModal = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);

  const closeAddModal = (val: boolean) => {
    setShowEditModal(val);
};


  return (
    <>
      <List.Item>
        {isLoading ? (
          <Card className="notes-card" style={{ overflow: 'auto', maxHeight: '200px' }}>
            <Skeleton.Avatar
              active
              shape="square"
              size={70}
              style={{ marginRight: '10px', borderRadius: '8px' }}
            />
            <Skeleton.Input active style={{ width: '60%', marginBottom: '8px' }} />
            <Skeleton.Input active style={{ width: '40%' }} />
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton.Button active shape="default" style={{ width: '80px' }} />
              <Skeleton.Button active shape="default" style={{ width: '80px' }} />
            </div>
          </Card>
        ) : (
            <div className='card-containers'   
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
      >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {isSharedNote ? <img
                   src= 'https://th.bing.com/th/id/OIP._68ZRdEO_tqFXCvo3t5dTwHaHa?pid=ImgDet&w=172&h=172&c=7&dpr=1.1'
               
                  alt="note1"
                  style={{
                    height: '40px',
                    width: '37px',
                    borderRadius: '8px',
                    marginRight: '10px',
                    marginLeft : '19px'
                  }} />: 
                  <img
                  src='https://th.bing.com/th/id/OIP.i__0WOddTKWfaNQPmRCZ-gAAAA?pid=ImgDet&w=172&h=172&c=7&dpr=1.1'
                  alt="note2"
                  style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '8px',
                    marginRight: '10px',
                    marginLeft : '19px'
                  }} 
                />}
                {isSharedNote?.permission === 'view' ?<div> <h3 className = 'item-title' style={{ marginBottom: '4px', marginTop: '0' }}>{item.title}</h3>
                  {isSharedNote?.permission === 'view' && 
                  <Popover content = {parsedNotes} placement='bottom'>                 
                     <p  style={{ margin: '0', padding: '0' }}>{contents}</p>
                  </Popover>

                  }
                  </div>
                :
                <div
                onClick={() => {
                  setCurrentNote(item);
                  setShowEditModal(true);
                }}
                style={{ padding: '0px', margin: '0px' }}
              >
                <Tooltip title="Edit Note" placement="topLeft">
                  <h3 className="item-title" style={{ marginBottom: '4px', marginTop: '0' }}>
                    {item.title}
                  </h3>
                  <Popover content={parsedNotes} placement="bottom">
                    <p style={{ margin: '0', padding: '0' }}>{contents}</p>
                  </Popover>
                </Tooltip>
              </div>
              }
              </div>
              {showEditModal && (
                <AddNote
                    showAddModal={showEditModal}
                    closeAddModal={closeAddModal}
                    currentNote={currentNote}
                />
            )}

              <div style={{ display: 'flex' }}>
                {isSharedNote ? (
                  <>
                    {isSharedNote.permission === 'edit' &&
                      isHovered && <NoteActions item={item} />
                    }
                  </>
                ) : (
                  <>
                    {isHovered && <NoteActions item={item}/>}
                  </>
                )}
              </div>
            </div>
        )}
      </List.Item>
      <Modal
        title={`Title: ${item.title}`}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>
        ]}
        style={{ overflow: 'auto', maxHeight: '330px' }}
      >
        {isLoading ? <Skeleton active paragraph={{ rows: 4 }} /> : parsedNotes}
      </Modal>
    </>
  );
});

export default Note;
