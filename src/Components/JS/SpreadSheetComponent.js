import React, { Component } from 'react';
import { Table } from 'reactstrap';
import SpreadsheetHead from './SpradSheetHeadComponent';
import SpreadsheetBody from './SpreadSheetBodyComponent';
import '../CSS/SpreadSheet.css'
import { CSVLink } from "react-csv";

class SpreadSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spread_data: [
                { index: 1, A: 'FHello', B: 'EHai', C: 'GHowareyou' },
                { index: 2, A: 'DHello', B: 'FHai', C: 'GHowareyou' },
                { index: 3, A: 'CHello', B: 'SHai', C: 'sHowareyou' },
                { index: 4, A: 'BHello', B: 'AHai', C: 'WHowareyou' },
            ],
            headers :[
                { label: "A", key: "A" },
                { label: "B", key: "B" },
                { label: "C", key: "C" }
            ],
            add_row_count:1,
            field_selected:' '

        }
    }

    onCellChange = (event, index_tochange, key_tochange) => {
        let temp_sheet = this.state.spread_data
        temp_sheet.find((element) => element.index === index_tochange.index)[key_tochange] = event.target.value;
        this.setState({ spread_data: temp_sheet })
    }
    
    addManyRows=(count)=>{
        var temp_sheet=this.state.spread_data
        for(var i=0;i<count;i++){
            temp_sheet=this.addSingleRow(temp_sheet)
        }
        this.setState({spread_data:temp_sheet})
    }
    addSingleRow=(temp_sheet)=>{
        
        let newRow_initail={index:temp_sheet.length+1}
        let newRow=this.state.headers.reduce((currVal,nextVal)=>{
            return({...currVal,[nextVal.label]:''})
        },newRow_initail)
        temp_sheet.push(newRow)
        return temp_sheet

    }

    addRowCountChange=(event)=>{
        this.setState({add_row_count:event.target.value})
    }

    selectField=(field_selected)=>{
        console.log(field_selected)
        this.setState({field_selected:field_selected})
    }

    addColumnLeft=(e)=>{
        e.stopPropagation();
        let split_header_index=null
        this.state.headers.forEach((item,index)=>{
            if(item.label===this.state.field_selected){
                split_header_index=index
            }
        })

        let prev_header=this.state.headers.slice(0,split_header_index)
        let after_header=this.state.headers.slice(split_header_index,this.state.headers.length)

        let new_spread_data=this.state.spread_data.map((item)=>{
            let prev_data=prev_header.reduce((currVal,nextVal)=>{
               return {...currVal,[nextVal.label]:item[nextVal.label]}
            },{index:item.index})
            
            let add_empty={...prev_data,[this.state.field_selected]:''}

            let after_data=after_header.reduce((currVal,nextVal)=>{
                return {...currVal,[String.fromCharCode(nextVal.label.charCodeAt()+1)]:item[nextVal.label]}
             },{})
             return {...add_empty,...after_data}
        })

        let temp_header=this.state.headers
        let new_head=String.fromCharCode((temp_header[temp_header.length-1].label.charCodeAt())+1)
        temp_header.push({label:new_head,key:new_head})
        this.setState({field_selected:String.fromCharCode(this.state.field_selected.charCodeAt()+1) ,spread_data:new_spread_data})
    }
    
    addColumnRight=(e)=>{
        e.stopPropagation();
        let split_header_index=null
        this.state.headers.forEach((item,index)=>{
            if(item.label===this.state.field_selected){
                split_header_index=index
            }
        })

        let prev_header=this.state.headers.slice(0,split_header_index+1)
        let after_header=this.state.headers.slice(split_header_index+1,this.state.headers.length)
 
        let new_spread_data=this.state.spread_data.map((item)=>{
            let prev_data=prev_header.reduce((currVal,nextVal)=>{
               return {...currVal,[nextVal.label]:item[nextVal.label]}
            },{index:item.index})
            
            let add_empty={...prev_data,[String.fromCharCode(this.state.field_selected.charCodeAt()+1)]:''}

            let after_data=after_header.reduce((currVal,nextVal)=>{
                return {...currVal,[String.fromCharCode(nextVal.label.charCodeAt()+1)]:item[nextVal.label]}
             },{})
             return {...add_empty,...after_data}
        })
        
        let temp_header=this.state.headers
        let new_head=String.fromCharCode((temp_header[temp_header.length-1].label.charCodeAt())+1)
        temp_header.push({label:new_head,key:new_head})
        this.setState({spread_data:new_spread_data})
    }

    sortColumnAtoZ=(e)=>{
        e.stopPropagation();
        let spread_data_temp=this.state.spread_data
        spread_data_temp=spread_data_temp.sort((a,b)=>{
            if(b[this.state.field_selected].toUpperCase()>a[this.state.field_selected].toUpperCase())
                return -1
            return 1
        })
        spread_data_temp.forEach((item,index)=>{
            item.index=index+1
        })
        this.setState({spread_data:spread_data_temp})
    }

    sortColumnZtoA=(e)=>{
        e.stopPropagation();
        let spread_data_temp=this.state.spread_data
        spread_data_temp=spread_data_temp.sort((a,b)=>{
            if(b[this.state.field_selected].toUpperCase()<a[this.state.field_selected].toUpperCase())
                return -1
            return 1
        })
        spread_data_temp.forEach((item,index)=>{
            item.index=index+1
        })
        this.setState({spread_data:spread_data_temp})
    }
    render() {
        return (
            <div>
                {this.state.field_selected}
                {this.props.match.params.id}
                <Table bordered>
                    <SpreadsheetHead head_data={Object.keys(this.state.spread_data[0])} addColumnLeft={this.addColumnLeft} addColumnRight={this.addColumnRight} sortAtoZ={this.sortColumnAtoZ} sortZtoA={this.sortColumnZtoA} field_selected={this.state.field_selected} selectField={this.selectField}/>
                    <SpreadsheetBody body_data={this.state.spread_data} onCellChange={this.onCellChange} />
                </Table>
                <CSVLink data={this.state.spread_data} headers={this.state.headers}>
                    Download me
                </CSVLink>;
                <div className="add-row" >
                <span>Add row</span> 
                <input type="text" value={this.state.add_row_count} onChange={this.addRowCountChange}></input>
                <span onClick={()=>this.addManyRows(parseInt(this.state.add_row_count))}>Add</span>
                </div>
            </div>
        )
    }
}

export default SpreadSheet