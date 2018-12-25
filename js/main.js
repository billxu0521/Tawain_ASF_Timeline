 //查詢公用函式
    function sql_query(sheetID,gid,sql = null){
      var sheetID = sheetID; // 試算表代號
      var gid = gid; // 工作表代號
      //var sql = encodeURI(sql); // SQL 語法 做URL轉換
      var callback = "callback"; // 回呼函數名稱

      //送出查詢
      if(sql == null){
        $.getScript("https://spreadsheets.google.com/tq?tqx=responseHandler:" + callback + "&key=" + sheetID + "&gid=" + gid);
      }else{
        $.getScript("https://spreadsheets.google.com/tq?tqx=responseHandler:" + callback + "&tq=" + sql + "&key=" + sheetID + "&gid=" + gid);
      }
      return callback;
    }

    function get_data(){
      var sheetID = "1CbDwtKpKiR6TlYOSgww1HXS2PpAQWyQ9qeYVUWvJclA", // 試算表代號
      gid = "2090449888"; // 工作表代號
      //sql = "SELECT A , AN"; // SQL 語法
      var res = sql_query(sheetID,gid);
      window[res] = function(json) {
        var $cSel = $('#query_list');

        var rowArray = json.table.rows,
        rowLength = rowArray.length,
        html = "",
        i, j, time,unit,unit_sloution,off_news,unoff_news_unit,unoff_news,other_inf;
        var inf = [];
        //console.log(rowArray)
        var _obj = {};
        var _obj_ary = [];
        unit = '';
        off_news = '';
        unit_sloution = '';
        rowArray.reverse();
        for (i = 0; i < rowLength; i++) {
          dataGroup = rowArray[i].c;
          dataLength = dataGroup.length;
          //console.log(dataGroup);
            if (!dataGroup) {
              continue;
            }else{
              if(!dataGroup[0]){
                time = time;
              }else{
                time = "";
                time = dataGroup[0].f;
                _obj_ary = [];
              }
              if(!dataGroup[1]){
                unit = unit;
              }else{
                unit = ""; 
                unit = dataGroup[1].v;
                if(!dataGroup[3]){
                  unit_sloution = "None";
                }else{
                  unit_sloution = dataGroup[3].v;
                }
                if(!dataGroup[4]){
                  off_news = "None";
                }else{
                  off_news = dataGroup[4].v;
                }
              }
              if(!dataGroup[5]){
                unoff_news_unit = "None";
                unoff_news = "None";
              }else{
                unoff_news_unit = dataGroup[5].v;
                if(!dataGroup[7]){
                  unoff_news = "None";
                }else{
                  unoff_news = dataGroup[7].v;
                }
              }
              if(!dataGroup[8]){
                other_inf = "None";
              }else{
                other_inf = dataGroup[8].v;
              }
              //console.log(time+'/'+unit+'/'+off_news);
              _obj = {'off_news':[unit,unit_sloution,off_news],'unoff_news':[unoff_news_unit,unoff_news],'other_inf':[other_inf]};
              _obj_ary.push(_obj);
              //console.log(_obj_ary);
            }
            inf[time] = _obj_ary;
            //console.log(_obj_ary);
            
          }
        //console.log(inf);
        creattimedata(inf);
      }
    }

    function creattimedata(obj){
      _rightleft = 0; //0-left 1-right
      month = 0;
      ch_month = ['none','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
      var $cSel = $('.VivaTimeline dl');
      //$cSel.append($("<dl></dl>");
      for (var key in obj) {
        _pos = 'pos-left clearfix';
        if(_rightleft == 0){
          _pos = 'pos-left clearfix';
          _rightleft = 1;
        }else{
          _pos = 'pos-right clearfix';
          _rightleft = 0;
        }
        date = key.split('/');
        _m = date[0];
        _d = date[1];
        //console.log(_m+','+_d);
        if(_m != month){
          month = _m;
          //console.log('month');
          $cSel.append('<dt>'+ch_month[_m]+'</dt>');
        }
        _data = obj[key]
        //console.log(_data);
        for(var i = 0; i < _data.length; i++){
          _title = _data[i].off_news[0];
          _content = _data[i].off_news[1];    
          html = '<dd class="'+_pos+'"><div class=circ></div><div class=time>'+_m+'月'+_d+'日</div><div class=events><div class=events-header>'+_title+'</div><div class=events-body><div class=row><div class="col-md-6 pull-left"></div><div class=events-desc>'+_content+'</div></div></div></div></dd>';
          //產生網頁
          $cSel.append(html);
        }
        }
    }
