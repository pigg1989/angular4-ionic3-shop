
import { AlipayOrder } from '@ionic-native/alipay';
import { HttpClient, HttpHeaders, HttpParams, HttpParameterCodec, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Md5 } from "ts-md5/dist/md5";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RestProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  13125684750
*/

 /*  "proxies": [{
    "path": "/api",
    "proxyUrl": "http://api.ufanli168.battleax.cn"
  }] */
@Injectable()
export class RestProvider {
  private baseUrl = 'http://api.ufanli168.battleax.cn';
  private headers = new HttpHeaders().set('token',Md5.hashStr(Md5.hashStr('pigg').toString().slice(3,11)).toString());
  private urls = {
    auto:{
      member: this.baseUrl
    },
    user:{
      getInfo: this.baseUrl + '/user'
    },
    ads:{
      getIndexAds: this.baseUrl + "/indexAds",
      getCateAds: this.baseUrl + '/indexAds?type=cate'
    },
    getArticles: {
      articleList: this.baseUrl + '/articles',
      articleContent: this.baseUrl + '/articles/'
    },
    goods: {
      goodsList: this.baseUrl + '/goods',
      goodsIndexHot: this.baseUrl + '/goods?type=indexHot',
      goodsIndex: this.baseUrl + '/goods?type=indexGoods',
      goodsListByCateId: this.baseUrl + '/goods?type=list',
      goodsContentById: this.baseUrl + '/goods?type=content',
      goodsImgsById:  this.baseUrl + '/goods?type=imgs',
      goodsDetailsById: this.baseUrl + '/goods?type=details',
      goodsSpecById: this.baseUrl + '/goods?type=spec',
      goodsByKeyWords: this.baseUrl + '/goods?type=keyWords',
      goodsListByIconNum: this.baseUrl + '/goods?type=nav'
    },
    login: this.baseUrl +'/login',
    order:{
      orderList: this.baseUrl + '/orderList',
      addOrder: this.baseUrl + '/order/create',
      getAlipayOrder: this.baseUrl + '/alipayOrder',
      getOrderInfo: this.baseUrl + '/order',
      cancelOrder: this.baseUrl + '/order',
      updateOrderStatus: this.baseUrl + '/order'
    },
    points: this.baseUrl + '/points',
    collect: {
      index: this.baseUrl + '/collect',
      create: this.baseUrl + '/collect/create',
      read: this.baseUrl + '/collect',
      delete: this.baseUrl + '/collect'
    },
    myteam: {
      lower: this.baseUrl + '/lower',
      higher: this.baseUrl + '/higher'
    },
    address:{
      getAddress: this.baseUrl + '/address',
      getUserAddressDefault: this.baseUrl + '/address',
      createAddress: this.baseUrl + '/address/create'
    },
    addressApi:{
      getAllAddress: this.baseUrl + '/addressApi'
    },
    getCategory: this.baseUrl + '/category',
    pay:{
      yuePay: this.baseUrl + '/yuePay'
    },
    cart:{
      cartList: this.baseUrl + '/cart',
      createCart: this.baseUrl + '/cart/create'
    },
    verify:{
      getVerify: this.baseUrl + '/verify'
    },
    withdraw:{
      addWithdraw: this.baseUrl + '/withdraw/create'
    },
    version:{
      getAppVersion: this.baseUrl + '/version'
    }

  }
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  public getIndexAds(): Observable<string[]>{
    return this.http.get<string[]>(this.urls.ads.getIndexAds,{headers:this.headers});
  }

  public getCateAds(): Observable<string[]>{
    return this.http.get<string[]>(this.urls.ads.getCateAds,{headers:this.headers});
  }

  public getArticles(index = 0): Observable<string[]>{
    return this.http.get<string[]>(this.urls.getArticles.articleList+"?index="+index,{headers:this.headers});
  }

  public getArticleById(id:number): Observable<string[]>{
    return this.http.get<string[]>(this.urls.getArticles.articleContent + '' + id,{headers:this.headers});
  }

  
  public getIndexHotGoods(): Observable<string[]>{
    return this.http.get<string[]>(this.urls.goods.goodsIndexHot,{headers:this.headers});
  }

  public getIndexGoods(): Observable<string[]>{
    return this.http.get<string[]>(this.urls.goods.goodsIndex,{headers:this.headers});
  }

  public getGoodsListByCateId(cateId,goodsIndex = 0): Observable<string[]>{
    return this.http.get<string[]>(this.urls.goods.goodsListByCateId+"&cateid="+cateId+"&goodsindex="+goodsIndex,{headers:this.headers});
  }

  public getGoodsListByKeyWords(keyWords): Observable<string[]>{
    let params = new HttpParams({
      fromString: 'keyWords='+keyWords
    });
    return this.http.get<string[]>(this.urls.goods.goodsByKeyWords,{params:params,headers: this.headers});
  }

  public getGoodsList(goodsIndex = 0): Observable<string[]> {
    return this.http.get<string[]>(this.urls.goods.goodsList +  "?index=" + goodsIndex,{headers:this.headers});
  }

  public getGoodsListByIconNum(goodsIndex=0,goodsListIconNum=1):Observable<string[]>{
   
    return this.http.get<string[]>(this.urls.goods.goodsListByIconNum+  "&index=" + goodsIndex+'&icon='+goodsListIconNum);
  }

  public getGoodsContentById(goodsId): Observable<string[]>{
    return this.http.get<string[]>(this.urls.goods.goodsContentById+'&goodsid='+goodsId,{headers:this.headers});
  }

  public getGoodsImgsById(goodsId): Observable<string[]>{
    return this.http.get<string[]>(this.urls.goods.goodsImgsById+"&goodsid="+goodsId,{headers:this.headers});
  }

  public getGoodsDetailsById(goodsId): Observable<string[]>{
    return this.http.get<string[]>(this.urls.goods.goodsDetailsById+"&goodsid="+goodsId,{headers:this.headers});
  }
  
  public getGoodsSpecById(goodsId): Observable<string[]>{
    return this.http.get<string[]>(this.urls.goods.goodsSpecById+"&goodsid="+goodsId,{headers:this.headers});
  }

  public login(userName,password,loginType='normal'): Observable<string[]>{  
    let passwordStr = loginType=='normal'?Md5.hashStr('TPSHOP'+password).toString():password;
    let params = new HttpParams({ fromString: 'username=' + userName + '&password=' +passwordStr  + '&type='+loginType});
   return this.http.get<string[]>(this.urls.login,{params,headers:this.headers});
  }

  public getOrderList(type,userId,orderListIndex= 0): Observable<string[]>{
    let params = new HttpParams({fromString: 'type=' + type + '&orderListIndex='+orderListIndex+'&userid='+userId});
    return this.http.get<string[]>(this.urls.order.orderList,{params,headers: this.headers});
  }
  
  public getPoints(type,userId,index=0):Observable<string[]>{
    let params = new HttpParams({fromString: 'type='+type+'&userid='+userId+'&index='+index});
    return this.http.get<string[]>(this.urls.points,{params, headers: this.headers});
  }

  public getCollect(type,userId,index=0):Observable<string[]>{
    let params = new HttpParams({fromString: 'type='+type+'&userid='+userId});
    return this.http.get<string[]>(this.urls.collect.index,{params,headers: this.headers});
  }

  public createCollect(userId,collectId,type="collect"):Observable<string[]>{
   
    let params = new HttpParams({fromString: 'userid='+userId+'&collectId='+collectId+"&type="+type});
    return this.http.get<string[]>(this.urls.collect.create,{params,headers: this.headers});
  }

  public readCollect(userId,collectId):Observable<string[]>{
    let params = new HttpParams({ fromString: 'userid=' + userId + '&collectId=' + collectId });
    return this.http.get<string[]>(this.urls.collect.read+'/'+collectId, {params,headers: this.headers});
  }

  public delCollect(userId,collectId,type="collect"):Observable<string[]>{
    let params = new HttpParams({ fromString: 'userid=' + userId + '&collectId=' + collectId + "&type="+type });
    return this.http.delete<string[]>(this.urls.collect.delete+'/'+collectId, {params,headers: this.headers});
  }
  public getLower(userId,index=0):Observable<string[]>{
    let params = new HttpParams({fromString: 'userid='+userId+'&index='+index});
    return this.http.get<string[]>(this.urls.myteam.lower,{params,headers: this.headers});
  }

  public getHigher(userId,index=0):Observable<string[]>{
    let params = new HttpParams({ fromString: 'userid=' + userId + '&index=' + index });
    return this.http.get<string[]>(this.urls.myteam.higher, {params,headers: this.headers});
  }

  public getAddress(userId,index=0):Observable<string[]>{
    let params = new HttpParams({ fromString: 'userid=' + userId + '&index=' + index });
    return this.http.get<string[]>(this.urls.address.getAddress, {params,headers: this.headers});
  }

  public getUserAddressDefault(userId,addressId=0):Observable<string[]>{
    let params = new HttpParams({
      fromString: 'userid=' + userId + '&type=userAddressDefault&addressId='+addressId
    })
    return this.http.get<string[]>(this.urls.address.getUserAddressDefault,{params: params,headers:this.headers});
  }

  public getAddressApi():Observable<string[]>{
    return this.http.get<string[]>(this.urls.addressApi.getAllAddress,{headers:this.headers});
  }

  public createAddress(userId,consignee,mobile,addressChoosen,address,is_default):Observable<string[]>{
    let params = new HttpParams({
      fromObject:{
        userId: userId,
        consignee:consignee,
        mobile:mobile,
        addressChoosen: addressChoosen,
        address: address,
        is_default:is_default
      }
    });
    return this.http.get<string[]>(this.urls.address.createAddress,{params:params});
  }

  public getCategory(index=0):Observable<string[]>{
    let params = new HttpParams({ fromString: 'index=' + index });
    return this.http.get<string[]>(this.urls.getCategory, {params,headers: this.headers});
  }

  public yuePay(userId,payPrice):Observable<string[]>{
    let params = new HttpParams({
      fromString: 'userid=' + userId + '&payPrice=' + payPrice
    })
    return this.http.get<string[]>(this.urls.pay.yuePay,{params:params});
  }

  public addOrder(userId,addressId,userNote,goodsInfoList):Observable<string[]>{
    let params = new HttpParams({
      fromString: 'userid=' + userId + '&type=add' + '&addressid='+ addressId + '&usernote='+userNote + '&goodsInfoList='+ encodeURIComponent(JSON.stringify(goodsInfoList))
    });
    return this.http.get<string[]>(this.urls.order.addOrder, {params,headers: this.headers});
  }

  public getOrderInfo(userId,orderId):Observable<string[]>{
    let params = new HttpParams({
      fromString: 'userid='+userId+"&orderid="+orderId
    })
    return this.http.get<string[]>(this.urls.order.getOrderInfo, {params,headers: this.headers});
  }

  public cancelOrder(userId,orderId){
    let params = new HttpParams({
      fromString: 'type=cancel'+'&userid='+ userId + '&orderid=' + orderId
    })
    return this.http.get<string[]>(this.urls.order.getOrderInfo,{params,headers: this.headers});
  }

  public getBasicOrderInfo(userId, orderId) {
    let params = new HttpParams({
      fromString: 'type=basic' + '&userid=' + userId + '&orderid=' + orderId
    })
    return this.http.get<string[]>(this.urls.order.getOrderInfo, { params, headers: this.headers });
  }
  public getAlipayOrder(orderId):Observable<AlipayOrder>{
    let params = new HttpParams({
      fromString: 'orderId='+orderId
    })
    return this.http.get<AlipayOrder>(this.urls.order.getAlipayOrder,{params: params, headers: this.headers});
  }

  public updateOrderStatus(orderId,status='hasPay',userId):any{
    let params = new HttpParams({
      fromObject: {
        status: status
      }
    });
    return this.http.put<any>(this.urls.order.updateOrderStatus + '/' + orderId ,{"status":status,'userId':userId},{headers: this.headers});
  }

  public getCartList(userId = null, uuid = null):Observable<string[]>{
  /*   if(!uuid){
      return null;
    } */
    let params = new HttpParams({
      fromString: 'userId='+userId+"&uuid="+uuid
    })
    return this.http.get<string[]>(this.urls.cart.cartList,{params: params,headers: this.headers});
  }

  public getCartListByCartIds(cartIds):Observable<string[]>{
    let params = new HttpParams({
      fromString: 'cartIds='+cartIds+'&type=cartIds'
    });
    return this.http.get<string[]>(this.urls.cart.cartList,{params:params, headers: this.headers});
  }

  public createCart(goodsList,userId=null,uuid=null):Observable<string[]>{
    let params = new HttpParams({
      fromString: 'goodsList='+encodeURIComponent(JSON.stringify(goodsList))+'&userId='+userId+'&uuid='+uuid
    });
    return this.http.get<string[]>(this.urls.cart.createCart,{params: params, headers: this.headers});
  }

  public getVerify(mobile):Observable<string[]>{
    let params = new HttpParams({
      fromString: 'mobile='+mobile
    });
    return this.http.get<string[]>(this.urls.verify.getVerify,{params: params,headers: this.headers});
  }

  public addWithdraw(type="yue",mobile,userId,bankCard,realname,bankName,money,verify):Observable<string[]>{
    let params = new HttpParams({
      // fromString: 'type='+type+'&money='+money+
      fromObject:{
        userId: userId,
        mobile: mobile,
        type:type,
        bankCard:bankCard,
        realname:realname,
        bankName: bankName,
        money: money,
        verify: verify
      }
    });
    return this.http.get<string[]>(this.urls.withdraw.addWithdraw,{params:params, headers: this.headers});
  }

  public getAppVersion(version):Observable<string>{
    let params = new HttpParams({
      fromObject: {
        version: version
      }
    });
    return this.http.get<string>(this.urls.version.getAppVersion,{params:params, headers: this.headers});
  }

  public autoMember(userId):any{
    let params = new HttpParams({
      fromObject: {
        userId: userId
      }
    });
    return this.http.get<any>(this.urls.auto.member, { params: params, headers: this.headers });
  }

  public getUserInfo(userId):Observable<string[]>{
    let params = new HttpParams({
     fromString: 'userId='+userId
    });
    return this.http.get<string[]>(this.urls.user.getInfo, { params: params, headers: this.headers });
  }
}
