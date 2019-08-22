import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import InfiniteScroll from './InfiniteScroll.js';

function InfiniteScrollDemo(){

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCompany, setCurrentCompany] = useState("Pepsi");
    const [previousCompany, setPreviousCompany] = useState(null);


    return (
        <React.Fragment>
        <header style={{height:'150px',position:'fixed',background:'white',width:'100%',top:'0',background:'hsla(0,50%,50%,.5)'}}>
            <h1>Here is a sticky header that is 150px tall</h1>
        </header>
        <div style={{marginTop:'150px'}}>
        <InfiniteScroll
            topOffset={150}
            items={[
                { companyName: "Pepsi", id: 1 },
                { companyName: "Coke", id: 2 },
                { companyName: "Dr. Pepper", id: 3 },
                { companyName: "Pepsi", id: 4 },
                { companyName: "Coke", id: 5 },
                { companyName: "Dr. Pepper", id: 6 },
                { companyName: "Pepsi", id: 7 },
                { companyName: "Coke", id: 8 },
                { companyName: "Dr. Pepper", id: 9 }
            ]}

          onChangeIndex={(newItem,newIndex,previousItem)=>{
            setCurrentIndex(newIndex);
            setCurrentCompany(newItem.companyName);
            setPreviousCompany(previousItem.companyName);
          }}

        >
            {(companyData, i) => {
            return <div>
                <div style={{position:'fixed',background:'white',padding:'5px',bottom:'0',border:'2px solid black'}}>
                    <div>Currently Index: {currentIndex}</div>
                    <div>Currently Viewed Company {currentCompany}</div>
                    <div>Previously Viewed Company {previousCompany}</div>
                </div>
            <h1>{companyData.companyName}</h1>
            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat velit velit, at luctus diam luctus ac. Aliquam tempor ornare turpis, porta bibendum sapien sagittis et. Etiam mollis metus vel eros imperdiet convallis. Aenean gravida porta libero pulvinar mollis. Nullam molestie hendrerit lobortis. Donec faucibus purus euismod urna dignissim, at dictum quam euismod. Vivamus hendrerit posuere mi non porttitor. Praesent at pharetra est.</p>

<p>Quisque tincidunt, purus eu varius dignissim, ipsum massa bibendum mauris, sed eleifend purus elit varius quam. Nulla commodo, dui eget tincidunt commodo, odio ipsum pellentesque dui, in pretium orci urna eget elit. Duis vitae commodo nisl. Proin rhoncus ipsum sit amet enim egestas, quis aliquet lectus cursus. Vestibulum ornare turpis justo, non vulputate nisl sollicitudin ut. Aenean finibus interdum lectus, nec finibus ipsum fringilla ut. Ut a massa purus. Aenean ipsum quam, pulvinar ac consectetur eget, cursus id tortor. Maecenas accumsan quam ex, quis posuere ante volutpat vitae. Praesent magna ipsum, lobortis facilisis elit eu, fringilla venenatis dui.</p>

<p>Duis vestibulum maximus aliquam. Donec id ullamcorper augue. Sed sit amet tellus risus. Fusce aliquam vestibulum diam nec faucibus. Aenean eget neque quis risus rhoncus varius ac vel lacus. Nam sit amet pharetra nisl. In sed ipsum rhoncus, vulputate metus vel, laoreet ex. Curabitur congue porta ipsum, id placerat tortor suscipit eu. Nunc ac purus in sapien pulvinar condimentum non non nulla. Vivamus id lacinia ligula. Aliquam hendrerit sed diam sed semper.</p>

<p>Curabitur nec placerat libero, vel malesuada quam. Nulla facilisi. Aenean mattis enim ac velit cursus bibendum. Quisque posuere lacus in dui aliquam accumsan. Suspendisse hendrerit mi sed orci blandit ultricies. Cras tempor non quam in mollis. Proin semper viverra tortor sit amet faucibus.</p>

<p>Maecenas ultricies ex felis, in volutpat neque iaculis quis. Ut malesuada rutrum diam, eu sollicitudin tortor consectetur id. Duis consectetur est orci, eu faucibus magna viverra sed. Phasellus volutpat aliquam erat vel maximus. Nullam interdum, dolor feugiat ullamcorper auctor, ligula orci sollicitudin neque, vitae mollis eros mi iaculis velit. Aenean pellentesque lorem quis ipsum porta, sed fringilla dui ultrices. Pellentesque vulputate sed tortor non convallis. Vivamus iaculis aliquam turpis sed tincidunt. Ut eu gravida nunc.</p>
            
            </div>;
          }}
        </InfiniteScroll>
        </div>
        </React.Fragment>
      );
}


ReactDOM.render(<InfiniteScrollDemo />, document.getElementById('root'));

