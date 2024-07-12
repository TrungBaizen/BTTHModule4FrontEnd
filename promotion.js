function getAll() {
    axios.get('http://localhost:8080/promotions')
        .then(function (response) {
            let promotions = response.data;
            let html = `<span>Discount</span>
                               <input type="text" id="searchDiscount" placeholder="Discount">
                               <span>Start Date</span>
                               <input type="date" id="searchStartDate" min="${new Date().toISOString().split('T')[0]}">
                               <span>End Date</span>
                               <input type="date" id="searchEndDate" min="${new Date().toISOString().split('T')[0]}">
                               <button onclick="search()">Search</button>
                <table border="1">
                             <tr>
                                 <td>Title</td>
                                 <td>Start Date</td>
                                 <td>End Date</td>
                                 <td>Discount</td>
                                 <td>Description</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
            for (let i = 0; i < promotions.length; i++) {
                html += `<tr>
                                <td>${promotions[i].title}</td>
                                <td>${promotions[i].startDate}</td>
                                <td>${promotions[i].endDate}</td>
                                <td>${promotions[i].discount}</td>
                                <td>${promotions[i].description}</td>
                                <td><button onclick="showFromUpdate(${promotions[i].id})">Edit</button></td>
                                <td><button onclick="remove(${promotions[i].id},'${promotions[i].title}')">Delete</button></td>
                             </tr>`
            }
            html += `<tr>
                        <td colspan="5"></td>
                        <td colspan="2" style="text-align: center"><button onclick="showFromCreate()">Add</button></td>
                     </tr>
                </table>`;
            document.getElementById("root").innerHTML = html;
        })
}

getAll()

function showFromCreate() {
        let html = `
        <button onclick="getAll()">Home</button>
        <input class="form-control" type="text" id="title" placeholder="Title">
        <span id="errortitle"></span>
        <input class="form-control" type="date" id="startDate" min="${new Date().toISOString().split('T')[0]}">
        <span id="errorstartDate"></span>
        <input class="form-control" type="date" id="endDate" min="${new Date().toISOString().split('T')[0]}">
        <span id="errorendDate"></span>
        <input class="form-control" type="text" id="discount" placeholder="Discount">
        <span id="errordiscount"></span>
        <input class="form-control" type="text" id="description" placeholder="Description">
        <span id="errordescription"></span>
        <button onclick="create()">Add</button>`
        document.getElementById("root").innerHTML = html;
}

function create() {
    let title = document.getElementById("title").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let discount = document.getElementById("discount").value;
    let description = document.getElementById("description").value;
    let promotion = {
        title: title,
        startDate: startDate,
        endDate: endDate,
        discount: discount,
        description: description
    }
    axios.post('http://localhost:8080/promotions', promotion).then(res => {
        alert("Thêm thành công");
        getAll();
    }).catch(error => {
        console.log(error.response.data)
        checkInput(error.response.data)
    })
}

//
function checkInput(errors) {
    errors.map(item => {
        let err = item.split(':')
        document.getElementById('error' + err[0]).innerHTML = err[1]
    })
}

function showFromUpdate(id) {
    axios.get('http://localhost:8080/promotions/' + id).then(res => {
        let promotion = res.data
        let startDateString = new Date(promotion.startDate).toISOString().split('T')[0];
        let endDateString = new Date(promotion.endDate).toISOString().split('T')[0];
        let html = `
        <button onclick="getAll()">Home</button>
    <div>
        <input type="text" id="title" value="${promotion.title}">
        <span id="errortitle"></span>
        <input type="date" id="startDate" value="${startDateString}" min="${new Date().toISOString().split('T')[0]}">
        <span id="errorstartDate"></span>
        <input type="date" id="endDate" value="${endDateString}" min="${new Date().toISOString().split('T')[0]}">
        <span id="errorendDate"></span>
        <input type="text" id="discount" value="${promotion.discount}">
        <span id="errordiscount"></span>
        <input type="text" id="description" value="${promotion.description}">
        <span id="errordescription"></span>`
        html += `</select>
                <span id="errortype"></span>
                <button onclick="update(${promotion.id})">Update</button>
    </div>`
        document.getElementById("root").innerHTML = html;
    })
}


function update(id) {
    let title = document.getElementById("title").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let discount = document.getElementById("discount").value;
    let description = document.getElementById("description").value;
    let promotion = {
        title: title,
        startDate: startDate,
        endDate: endDate,
        discount: discount,
        description: description
    }
    axios.put('http://localhost:8080/promotions/'+id, promotion).then(res => {
        alert("Sửa thành công");
        getAll()
    }).catch(error =>{
        checkInput(error.response.data);
    })
}

function remove(id,title) {
    let choice = confirm(`Bạn chắc chưa muốn xóa khuyến mãi ${title}`);
    if (choice){
        axios.delete('http://localhost:8080/promotions/'+id).then(res => {
            alert(`Xóa thành công khuyến mãi ${title}`);
            getAll();
        })
    }else {
        alert(`Hủy xóa thành công khuyến mãi ${title}`);
    }
}

function search() {
    let discount = document.getElementById("searchDiscount").value;
    let startDate = document.getElementById("searchStartDate").value;
    let endDate = document.getElementById("searchEndDate").value;
    axios.get('http://localhost:8080/promotions/search?discount='+discount+'&startDate='+startDate+'&endDate='+endDate).then(res => {
        let promotions = res.data;
        let html = `<span>Discount</span>
                               <input type="text" id="searchDiscount" placeholder="Discount">
                               <span>Start Date</span>
                               <input type="date" id="searchStartDate" min="${new Date().toISOString().split('T')[0]}">
                               <span>End Date</span>
                               <input type="date" id="searchEndDate" min="${new Date().toISOString().split('T')[0]}">
                               <button onclick="search()">Search</button>
                <table border="1">
                             <tr>
                                 <td>Title</td>
                                 <td>Start Date</td>
                                 <td>End Date</td>
                                 <td>Discount</td>
                                 <td>Description</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
        for (let i = 0; i < promotions.length; i++) {
            html += `<tr>
                                <td>${promotions[i].title}</td>
                                <td>${promotions[i].startDate}</td>
                                <td>${promotions[i].endDate}</td>
                                <td>${promotions[i].discount}</td>
                                <td>${promotions[i].description}</td>
                                <td><button onclick="showFromUpdate(${promotions[i].id})">Edit</button></td>
                                <td><button onclick="remove(${promotions[i].id},'${promotions[i].title}')">Delete</button></td>
                             </tr>`
        }
        html += `<tr>
                        <td colspan="5"></td>
                        <td colspan="2" style="text-align: center"><button onclick="showFromCreate()">Add</button></td>
                     </tr>
                </table>`;
        document.getElementById("root").innerHTML = html;
    })
}
