import React, { Component } from 'react';
import { Text, TextInput } from 'react-native'
import Dialog, { DialogContent, DialogButton, DialogTitle, DialogFooter } from 'react-native-popup-dialog'

export default class AddStationPopup extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.popupVisible)
        return (
            <Dialog
                visible={this.props.popupVisible}
                onTouchOutside={() =>
                    this.props.setPopupVisible(false)
                }
                dialogTitle={
                    <DialogTitle
                        title='Nhập thông tin trạm mới' />
                }
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        bordered
                        onPress={() => {
                          this.props.setPopupVisible(false)
                        }}
                        key="button-1"
                      />
                      <DialogButton
                        text="OK"
                        bordered
                        onPress={() => {
                          
                        }}
                        key="button-2"
                      />
                    </DialogFooter>
                  }
            >
                <DialogContent>
                    <TextInput placeholder='station name'/>
                    <TextInput placeholder='station address'/>
                    <TextInput placeholder='location'/>
                </DialogContent>

            </Dialog>
        )
    }
}