import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Modal , Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import firebase from '../../../../firebase'
import { setCurrentChatRoom } from '../../../../redux/actions/chatRoom_actions'

export class ChatRooms extends Component {
    
    state = {
        show: false,
        name: "",
        description: "",
        chatRoomsRef: firebase.database().ref("chatRooms"),
        chatRooms : [],
        firstLoad : true,
        activeChatRoomId : ""
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    componentDidMount(){
        //firebase 에서 chatRoom 목록을 불러오기 위한 리스너
        this.AddChatRoomsListeners();
    }

    componentWillUnmount(){
        // 리스너 제거
        this.state.chatRoomsRef.off();
    }

    //firebase 에서 chatRoom 목록을 불러오기 위한 리스너
    AddChatRoomsListeners = () => {
        let chatRoomsArray = []

        this.state.chatRoomsRef.on("child_added", DataSnapShot => {
            chatRoomsArray.push(DataSnapShot.val());            
            this.setState({ chatRooms: chatRoomsArray },
                () => this.setFirstChatRoom());
            })                    
    }

    //첫번쨰 채팅룸 선택하기
    setFirstChatRoom = () => {
        const firstChatRoom = this.state.chatRooms[0]        
        if(this.state.firstLoad && this.state.chatRooms.length > 0 ) {
            this.props.dispatch(setCurrentChatRoom(firstChatRoom))
            this.setState({ activeChatRoomId : firstChatRoom.id })
        }
        this.setState({ firstLoad: false})

    }


    handleSubmit = (e) => {
        //페이지 리프레시 방지
        e.preventDefault();
        const { name, description } = this.state;

        //유효성 체크
        if(this.isFormvalid(name,description)){
            this.addChatRoom();
        }
    }

    //firebase database 에 방 추가
    addChatRoom = async () => {
        const key = this.state.chatRoomsRef.push().key;
        const { name, description } = this.state;
        const { user } = this.props;
        const newChatRoom = {
            id: key,
            name: name,
            description: description,
            createdBy: {
                name : user.displayName,
                image : user.photoURL
            }
        }

        // database 에 방 추가
        try {
            await this.state.chatRoomsRef.child(key).update(newChatRoom)
            //업데이트 후 state 초기화
            this.setState({
                name: "",
                description: "",
                show: false
            })
            
        } catch (error) {
            alert(error)
        }
    }

    //chatRoom 정보를 리덕스 스토어에 저장
    changeChatRooms = (chatRoom) => {    
        this.props.dispatch(setCurrentChatRoom(chatRoom))
        this.setState({ activeChatRoomId : chatRoom.id })
    }

    renderChatrooms =(chatRooms) => 
        chatRooms.length > 0 &&
        chatRooms.map(chatRoom => (
            <li 
                key = {chatRoom.id}
                style = {{listStyle: 'none', marginLeft: '1rem', background: chatRoom.id === this.state.activeChatRoomId && "#828282"}}
                onClick={() => this.changeChatRooms(chatRoom)}>
                # {chatRoom.name}
            </li>
        ))
    

    //유효성 체크 헬퍼 메서드 (체 크)
    isFormvalid = (name, description) => 
        name && description
    

    render(props) {

        return (
            <div>

                <div style= {{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center'}}>
                    방 목록{" "} ({this.state.chatRooms.length})

                    <FaPlus style={{position: 'absolute', right: 0, cursor: 'pointer'}}
                        onClick={this.handleShow}
                    />
                </div>
                
                <ul style ={{ listStylePosition: 'none', padding: 0}}>
                    {this.renderChatrooms(this.state.chatRooms)}
                </ul>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>방 생성</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>방 이름</Form.Label>
                                <Form.Control 
                                onChange={(e)=>this.setState({name: e.target.value})}
                                type="text" placeholder="방 이름을 입력하세요"/>               
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>방 설명</Form.Label>
                                <Form.Control 
                                onChange={(e)=>this.setState({description: e.target.value})}
                                type="text" placeholder="방 설명을 입력하세요"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            닫기
                        </Button>

                        <Button variant="primary" onClick={this.handleSubmit}>
                            생성
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

const mpaStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mpaStateToProps)(ChatRooms)
