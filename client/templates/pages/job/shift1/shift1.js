

// console.log("This is your cavitation" +Parts.findOne().cavitation);
Template.shift1.helpers({

   calculateTime: function () {
     Meteor.subscribe('cycles-recent', moment().subtract(1, 'days').format("YYYY-MM-DD 23:00:00.000"))
   Meteor.subscribe('parts');
Meteor.subscribe('machines');
    
num= Machines.findOne();
     num=num.machinenumber;
 count = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find().fetch().pop().timestamp.toString()).subtract(60,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS")}}).count()
         
         estimatedTime = (Number(Parts.find().fetch().pop().quantity) - Number(count))  / Number(Parts.find().fetch().pop().cavitation);
         //figure out cycle time
         
        start =Cycles.findOne({PressNumber: num, AutoStatus:'1',CycleTimeStamp: {$gte: moment(Parts.find().fetch().pop().timestamp.toString()).format("YYYY-MM-DD HH:mm:ss.SSS")}}).CycleTimeStamp
        
        next =Cycles.findOne({PressNumber: num, AutoStatus:'1',CycleTimeStamp: {$gt: moment(start.toString()).format("YYYY-MM-DD HH:mm:ss.SSS")}}).CycleTimeStamp
       
        startseconds=moment(start).format("ss.SSS")
        startminutes=moment(start).format("mm")
        startseconds=Number(startseconds)+ Number(startminutes)*60
        nextseconds=moment(next).format("ss.SSS")
        nextminutes=moment(next).format("mm")
        nextseconds=Number(nextseconds) + Number(nextminutes)*60
        cycletime= nextseconds-startseconds

         
         estimatedTime=estimatedTime * cycletime
         estimatedminutes=parseInt(estimatedTime/60);
         
          totaltime= Number(Parts.find().fetch().pop().quantity)/Number(Parts.find().fetch().pop().cavitation)
          totaltime = totaltime*cycletime

         totaltime= parseInt(totaltime/60);
         if (totaltime <=0)
         {
          totaltime=1;

         }
if (estimatedminutes <=0)
{

  estimatedminutes=0;
}         
        
         percent=estimatedminutes/totaltime;
          percent=percent*100;
          percent=parseInt(percent)
         
          if (percent<=0)
          {

           percent=0;
          }

       estimatedhours = estimatedminutes/60;
       estimatedhours = parseInt(estimatedhours)
       estimatedminutesleft=estimatedminutes%60;

         
       
       if (estimatedhours===1)
         {
         return estimatedhours.toString().concat(" hour left and ",estimatedminutesleft," minutes left");

}
else 
{
  return estimatedhours.toString().concat(" hours left and ",estimatedminutesleft," minutes left");
}

     },
   hour1p: function () {
     num= Machines.findOne();
     num=num.machinenumber
     now="07"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     //change these to be based off of a count function
     if (count>1)
    {
     return "1"
   }
   },
   
   hour2p: function () {
   num= Machines.findOne();
     num=num.machinenumber
     now="08"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     if (count>1)
    {
     return "2"
   }
   },
   hour3p: function () {
     num= Machines.findOne();
     num=num.machinenumber
     now="09"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     if (count>1)
    {
     return "3"
   }
   },
   hour4p: function () {
    num= Machines.findOne();
     num=num.machinenumber
     now="10"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     if (count>1)
    {
     return "4"
   }
   },
   hour5p: function () {
    num= Machines.findOne();
     num=num.machinenumber
     now="11"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     if (count>1)
    {
     return "5"
   }
   },
   hour6p: function () {
     num= Machines.findOne();
     num=num.machinenumber
     now="12"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     if (count>1)
    {
     return "6"
   }
   },
   hour7p: function () {
     num= Machines.findOne();
     num=num.machinenumber
     now="13"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     if (count>1)
    {
     return "7"
   }
   },
   hour8p: function () {
     num= Machines.findOne();
     num=num.machinenumber
     now="14"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     if (count>1)
    {
     return "8"
   }
   },

     
     
    earnedHours1: function () {
 
     
      
 
  

            },
            earnedHours1p: function () {
      

            },
      
     incomingCycles1: function () {
        //grab all cycles from today
      num= Machines.findOne();
     num=num.machinenumber
      now="07"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
           
        
         percent=estimatedminutes/totaltime;
          percent=percent*100;
          percent=parseInt(percent)
          
          if (percent<=0)
          {

           percent=0;
          }

 if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object' && count===1)
      {
    return Cycles.find({PressNumber: num,AutoStatus: "1",CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
  }
  else if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object' && count>=2)
      {
        //the start time is same.  The end time will be the most recent job

    return Cycles.find({PressNumber: num,AutoStatus: "1",CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
  }
  else if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'undefined' && percent >0 )
{
  
     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * Parts.find({hour: {$lt: now}, month: month, day: day}).fetch().pop().cavitation;
  
    }
    
        
      },
      
     incomingCycles1p: function () {
       num= Machines.findOne();
     num=num.machinenumber
     now="07"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      //The start time will be time stamp of the most recent job
      //the end time will be the end of the hour
      //the time stamp of the most recent job will be 
      if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        return Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
      }
        else if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count >2)
      {

        //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
        //at this point the second submission will be the second item in the collection or middle item
        return Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
      }
     

     
      },
     earnedHours2: function () {
 
 // num= Machines.find().fetch().pop();
 //     num=num.machinenumber
     
 //    //Work on the logic for 4 different submitted jobs 
 //    hour= Parts.find().fetch().pop();
 //     hour=num.hour  //this is the hour of the submitted job 
 //     now=moment().format("HH")
 //     count= Parts.find({hour: now}).count()
       
 // if (typeof Parts.findOne({hour: '08'}) === 'object' && count===1)
 //      {
 //    var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1",CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 08:00:00.000"), $lt: moment().format("YYYY-MM-DD 09:00:00.000")}}).count() * (Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
 // earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
 //        return earnedHoursCalc;
 //  }
 //  else if (typeof Parts.findOne({hour: '08'}) === 'object' && count>=2)
 //      {
 //        //the start time is same.  The end time will be the most recent job
 // var minutes = Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
 //    var percent = minutes/Number(60) //This is the percent used in my program
 //    var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1",CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 08:00:00.000"), $lt: moment(Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 08:mm:ss.SSS")}}).count() * (Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) * percent;
 //  earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
 //        return earnedHoursCalc;

 //  }
 //        },
 //            earnedHours2p: function () {
 //      num= Machines.find().fetch().pop();
 //     num=num.machinenumber
     
 //    //Work on the logic for 4 different submitted jobs 
     
 //     now="08"
 //     count= Parts.find({hour: '08'}).count()
      
 //      //The start time will be time stamp of the most recent job
 //      //the end time will be the end of the hour
 //      //the time stamp of the most recent job will be 
 //       var minutes = Number(60) - Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
 //    var percent = minutes/Number(60) //This is the percent used in my program
       
 //      if (typeof Parts.findOne({hour: '08'})=== 'object'  && count ===2)
 //      {
 //        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
 //        //I need the time stamp of the most recently submitted job
 //        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
 //        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 08:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 09:00:00.000")}}).count() * (Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
 //        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
 //        return earnedHoursCalc;
 //      }
 //      if (typeof Parts.findOne({hour: '08'})=== 'object'  && count >2)
 //      {
 //        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
 //        //I need the time stamp of the most recently submitted job
 //        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
 //        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 08:mm:ss.SSS"), $lt: moment(Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 08:mm:ss.SSS")}}).count() * (Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:'08'}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
 //        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
 //        return earnedHoursCalc;
 //      }  
      

            },
      
    
      incomingCycles2: function () {
        //grab all cycles from today
       num= Machines.findOne();
     num=num.machinenumber
     now="08"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
     

 if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
      {
    return Cycles.find({PressNumber: num, AutoStatus: "1",CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 08:00:00.000"), $lt: moment().format("YYYY-MM-DD 089:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
  }
  else if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count>=2)
      {
        //the start time is same.  The end time will be the most recent job

    return Cycles.find({PressNumber: num, AutoStatus: "1",CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 08:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 08:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
  }
   count = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find().fetch().pop().timestamp.toString()).format("YYYY-MM-DD HH:mm:ss.SSS")}}).count()
         estimatedTime = (Number(Parts.find().fetch().pop().quantity) - Number(count))  / Number(Parts.find().fetch().pop().cavitation);
         estimatedTime=estimatedTime * 10; //This 10 is a place holder for the time per cycle
         estimatedminutes=parseInt(estimatedTime/60);
         
          
  //I will need to calculate here if the previous job would have finished in this hour or not.
  //If it would have then I should output its data until the time it would finish.
  //Cycles.find

    if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'undefined' && percent >0 )
    {
  
     return Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 08:00:00.000"), $lt: moment().format("YYYY-MM-DD 09:00:00.000")}}).count() * Parts.find({hour: {$lt: now},month: month, day: day}).fetch().pop().cavitation;
  
    }
    
  
        
      },
      
     incomingCycles2p: function () {
        num= Machines.findOne();
     num=num.machinenumber
       now="08"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      //The start time will be time stamp of the most recent job
      //the end time will be the end of the hour
      //the time stamp of the most recent job will be 
      if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        return Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 08:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 09:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
      }
        else if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count >2)
      {

        //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
        //at this point the second submission will be the second item in the collection or middle item
        return Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 08:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 08:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
      }
    
        
  else if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'undefined' && percent >0 )
{
  
     return Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 08:00:00.000"), $lt: moment().format("YYYY-MM-DD 09:00:00.000")}}).count() * Parts.find({hour: {$lt: now}, month: month, day: day}).fetch().pop().cavitation;
  
    }
    
  

     
      },
 // earnedHours3: function () {
 
//  num= Machines.find().fetch().pop();
//      num=num.machinenumber
     
//     //Work on the logic for 4 different submitted jobs 
    
//      now="09"
//      count= Parts.find({hour: now}).count()
       
//  if (typeof Parts.findOne({hour: now}) === 'object' && count===1)
//       {
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 09:00:00.000"), $lt: moment().format("YYYY-MM-DD 10:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
//  earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//   }
//   else if (typeof Parts.findOne({hour: now}) === 'object' && count>=2)
//       {
//         //the start time is same.  The end time will be the most recent job
//  var minutes = Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60) //This is the percent used in my program
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 09:00:00.000"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 09:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) * percent;
//   earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;

//   }
//         },
//             earnedHours3p: function () {
//       num= Machines.find().fetch().pop();
//      num=num.machinenumber
       
//      now="09"
//      count= Parts.find({hour:now}).count()
      
//     var minutes = Number(60) - Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60) //This is the percent used in my program
       
//       if (typeof Parts.findOne({hour: now})=== 'object'  && count >=2)
//       {
//         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
//         //I need the time stamp of the most recently submitted job
//         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
//          var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 09:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 10:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       }
//       else if (typeof Parts.findOne({hour: now})=== 'object'  && count >2)
//       {

//         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 09:mm:ss.SSS"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 09:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       }   
      

//             },
      
    incomingCycles3: function () {
         //grab all cycles from today
       num= Machines.findOne();
     num=num.machinenumber
     now="09";
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
  if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
       {
     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 09:00:00.000"), $lt: moment().format("YYYY-MM-DD 10:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
   else if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count>=2)
       {
         //the start time is same.  The end time will be the most recent job

     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 09:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 09:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
 
  
        
       },
      
      incomingCycles3p: function () {
          num= Machines.findOne();
     num=num.machinenumber
     now="09"
   month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       //the time stamp of the most recent job will be 
      if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
       {
         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
         //I need the time stamp of the most recently submitted job
         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 09:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 10:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
       }
         else if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count >2)
       {

         //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
         //at this point the second submission will be the second item in the collection or middle item
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 09:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 09:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
       }
     

     
       },

// earnedHours4: function () {
 
//  num= Machines.find().fetch().pop();
//      num=num.machinenumber
     
//     //Work on the logic for 4 different submitted jobs 
    
//      now="10"
//      count= Parts.find({hour: now}).count()
       
//  if (typeof Parts.findOne({hour: now}) === 'object' && count===1)
//       {
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 10:00:00.000"), $lt: moment().format("YYYY-MM-DD 11:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
//  earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//   }
//   else if (typeof Parts.findOne({hour: now}) === 'object' && count>=2)
//       {
//         //the start time is same.  The end time will be the most recent job
//  var minutes = Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60) //This is the percent used in my program
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 10:00:00.000"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 10:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) * percent;
//   earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;

//   }
//         },
//             earnedHours4p: function () {
//       num= Machines.find().fetch().pop();
//      num=num.machinenumber
       
//      now="10"
//      count= Parts.find({hour:now}).count()
      
      
//       var minutes = Number(60) - Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60)
//       if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
//       {
//         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
//         //I need the time stamp of the most recently submitted job
//         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
//          //This is the percent used in my program
//         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 10:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 11:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       }
//        else if (typeof Parts.findOne({hour: now})=== 'object'  && count >2)
//       {

//         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 10:mm:ss.SSS"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 10:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       } 
      

//             },
      
      incomingCycles4: function () {
         //grab all cycles from today
        num= Machines.findOne();
     num=num.machinenumber
     now="10";
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
  if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
       {
     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 10:00:00.000"), $lt: moment().format("YYYY-MM-DD 11:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
   else if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object' && count>=2)
      {
         //the start time is same.  The end time will be the most recent job

     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 10:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 10:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
 
  
        
       },
      
      incomingCycles4p: function () {
      num= Machines.findOne();
     num=num.machinenumber
     now="10"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       //the time stamp of the most recent job will be 
      if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
       {
         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
         //I need the time stamp of the most recently submitted job
         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 10:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 11:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
       }
         else if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count >2)
       {

         //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
         //at this point the second submission will be the second item in the collection or middle item
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 10:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 10:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
       }
     

     
       },
 // earnedHours5: function () {
  // num= Machines.findOne();
  //    num=num.machinenumber
  //    month=Parts.findOne({hour: now}).month
  //   day=Parts.findOne({hour: now}).day
  //    now="11"
  //     count= Parts.find({hour:now, month: month, day: day}).count()
       
  // if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
  //      {
  //    var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 11:00:00.000"), $lt: moment().format("YYYY-MM-DD 12:00:00.000")}}).count() * (Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
  // earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
  //        return earnedHoursCalc;
  //  }
  //  else if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object' && count>=2)
  //      {
  //        //the start time is same.  The end time will be the most recent job
  // var minutes = Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
  //    var percent = minutes/Number(60) //This is the percent used in my program
  //    var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 11:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 11:mm:ss.SSS")}}).count() * (Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) * percent;
  //  earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
  //        return earnedHoursCalc;

  //  }
         // },
    //         earnedHours5p: function () {
    //    num= Machines.find().fetch().pop();
    //   num=num.machinenumber
       
    //   now="11"
    //   count= Parts.find({hour:now}).count()
      
      
    //    var minutes = Number(60) - Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
    // var percent = minutes/Number(60)
    //   if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
    //    {
    //      //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
    //      //I need the time stamp of the most recently submitted job
    //      //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
    //       //This is the percent used in my program
    //      var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 11:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 12:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
    //      earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
    //      return earnedHoursCalc;
    //    }
    //     else if (typeof Parts.findOne({hour: now})=== 'object'  && count >2)
    //    {

    //      var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 11:mm:ss.SSS"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 11:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
    //      earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
    //     return earnedHoursCalc;
    //    } 
      

    //          },
      
      incomingCycles5: function () {
        num= Machines.findOne();
     num=num.machinenumber
     now="11";
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
  if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
       {
     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 11:00:00.000"), $lt: moment().format("YYYY-MM-DD 12:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
   else if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object' && count>=2)
       {
         //the start time is same.  The end time will be the most recent job

     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 11:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 11:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
 
  
        
       },
      
     incomingCycles5p: function () {
        num= Machines.findOne();
     num=num.machinenumber
     now="11"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       //the time stamp of the most recent job will be 
       if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
       {
         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
         //I need the time stamp of the most recently submitted job
         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 11:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 12:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
       }
         else if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count >2)
       {

        //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
         //at this point the second submission will be the second item in the collection or middle item
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 11:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 11:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
       }
     

     
       },
 // earnedHours6: function () {
 
 //  num= Machines.findOne();
 //     num=num.machinenumber
 //     now="12"
 //     month=Parts.findOne({hour: now}).month
 //    day=Parts.findOne({hour: now}).day
    
     
 //      count= Parts.find({hour:now, month: month, day: day}).count()
       
 // if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
 //       {
 //     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 12:00:00.000"), $lt: moment().format("YYYY-MM-DD 13:00:00.000")}}).count() * (Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
 //  earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
 //         return earnedHoursCalc;
 //   }
 //   else if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count>=2)
 //       {
 //        //the start time is same.  The end time will be the most recent job
 //  var minutes = Number(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
 //     var percent = minutes/Number(60) //This is the percent used in my program
 //    var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 12:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 12:mm:ss.SSS")}}).count() * (Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) * percent;
 //   earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
 //         return earnedHoursCalc;

   // }
   //       },
     //        earnedHours6p: function () {
     //   num= Machines.find().fetch().pop();
     //  num=num.machinenumber
       
     //  now="12"
     //  count= Parts.find({hour:now}).count()
      
      
     //   var minutes = Number(60) - Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
     // var percent = minutes/Number(60)
     //   if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
     //  {
     //    //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
     //     //I need the time stamp of the most recently submitted job
     //     //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
     //      //This is the percent used in my program
     //    var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 12:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 13:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
     //     earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
     //     return earnedHoursCalc;
     //   }
     //   else if (typeof Parts.findOne({hour: now})=== 'object'  && count >2)
     //  {

     //    var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 12:mm:ss.SSS"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 12:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
     //     earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
     //     return earnedHoursCalc;
     //   } 
      

     //         },
      
      incomingCycles6: function () {
//         //grab all cycles from today
     num= Machines.findOne();
     num=num.machinenumber
     now="12"
   month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
  if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
       {
    return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 12:00:00.000"), $lt: moment().format("YYYY-MM-DD 13:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
   else if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count>=2)
       {
         //the start time is same.  The end time will be the most recent job
          return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 12:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 12:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
 
  
        
       },
      
      incomingCycles6p: function () {
        num= Machines.findOne();
     num=num.machinenumber
     now="12"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
      {
         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
         //I need the time stamp of the most recently submitted job
         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 12:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 13:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
       }
         else if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count >2)
       {

        //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
         //at this point the second submission will be the second item in the collection or middle item
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 12:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 12:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
       }
     

     
       },
// earnedHours7: function () {
 
//  num= Machines.find().fetch().pop();
//      num=num.machinenumber
     
//     //Work on the logic for 4 different submitted jobs 
    
//      now="13"
//      count= Parts.find({hour: now}).count()
       
//  if (typeof Parts.findOne({hour: now}) === 'object' && count===1)
//       {
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 13:00:00.000"), $lt: moment().format("YYYY-MM-DD 14:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
//  earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//   }
//   else if (typeof Parts.findOne({hour: now}) === 'object' && count>=2)
//       {
//         //the start time is same.  The end time will be the most recent job
//  var minutes = Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60) //This is the percent used in my program
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 13:00:00.000"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 13:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) * percent;
//   earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;

//   }
//         },
//             earnedHours7p: function () {
//       num= Machines.find().fetch().pop();
//      num=num.machinenumber
       
//      now="13"
//      count= Parts.find({hour:now}).count()
      
      
//       var minutes = Number(60) - Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60)
//       if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
//       {
//         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
//         //I need the time stamp of the most recently submitted job
//         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
//          //This is the percent used in my program
//         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 13:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 14:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       }
//        else if (typeof Parts.findOne({hour: now})=== 'object'  && count >2)
//       {

//         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 13:mm:ss.SSS"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 13:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       } 
      

//             },
      
      incomingCycles7: function () {
        num= Machines.findOne();
     num=num.machinenumber
     now="13";
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
  if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
       {
     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 13:00:00.000"), $lt: moment().format("YYYY-MM-DD 14:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
   else if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count>=2)
       {
         //the start time is same.  The end time will be the most recent job

     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 13:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 13:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
 
  
        
       },
      
     incomingCycles7p: function () {
        num= Machines.findOne();
     num=num.machinenumber
     now="13"
   month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       //the end time will be the end of the hour
      //the time stamp of the most recent job will be 
       if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
       {
         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
         //I need the time stamp of the most recently submitted job
         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 13:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 14:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
       }
         else if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count >2)
      {

         //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
         //at this point the second submission will be the second item in the collection or middle item
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 13:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 13:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
       }
     

     
      },
// earnedHours8: function () {
 
//  num= Machines.find().fetch().pop();
//      num=num.machinenumber
     
//     //Work on the logic for 4 different submitted jobs 
    
//      now="14"
//      count= Parts.find({hour: now}).count()
       
//  if (typeof Parts.findOne({hour: now}) === 'object' && count===1)
//       {
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 14:00:00.000"), $lt: moment().format("YYYY-MM-DD 15:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
//  earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//   }
//   else if (typeof Parts.findOne({hour: now}) === 'object' && count>=2)
//       {
//         //the start time is same.  The end time will be the most recent job
//  var minutes = Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60) //This is the percent used in my program
//     var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 14:00:00.000"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 14:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) * percent;
//   earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;

//   }
//         },
//             earnedHours8p: function () {
//       num= Machines.find().fetch().pop();
//      num=num.machinenumber
       
//      now="14"
//      count= Parts.find({hour:now}).count()
      
      
//       var minutes = Number(60) - Number(Parts.find({hour: now}, {sort: {minute: 1}, limit: 2}).fetch().pop().minute) 
//     var percent = minutes/Number(60)
//       if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
//       {
//         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
//         //I need the time stamp of the most recently submitted job
//         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
//          //This is the percent used in my program
//         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 14:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 15:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       }
//        else if (typeof Parts.findOne({hour: now})=== 'object'  && count >2)
//       {

//         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 14:mm:ss.SSS"), $lt: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 14:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) * percent;
         
//         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
//         return earnedHoursCalc;
//       } 
      

//             },
      
      incomingCycles8: function () {
         num= Machines.findOne();
     num=num.machinenumber
      now="14"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
  if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count===1)
       {
     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 14:00:00.000"), $lt: moment().format("YYYY-MM-DD 15:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
   else if (typeof Parts.findOne({hour:now, month: month, day: day}) === 'object' && count>=2)
      {
         //the start time is same.  The end time will be the most recent job

     return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 14:00:00.000"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 14:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation;
   }
        
       },
      
      incomingCycles8p: function () {
        num= Machines.findOne();
     num=num.machinenumber
      now="14"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count ===2)
       {
         //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
         //I need the time stamp of the most recently submitted job
         //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(part = Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop()).format("YYYY-MM-DD 14:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 15:00:00.000")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
         
       
       }
         else if (typeof Parts.findOne({hour:now, month: month, day: day})=== 'object'  && count >2)
       {

         //if there are three job submissions.  this should start from its time stamp and end and the most recent time stamp
         //at this point the second submission will be the second item in the collection or middle item
         return Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 14:mm:ss.SSS"), $lt: moment(Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 3}).fetch().pop().timestamp).format("YYYY-MM-DD 14:mm:ss.SSS")}}).count() * Parts.find({hour:now, month: month, day: day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation;
       
       }
     

     
       },

    

     changeStatus1: function() {
       num= Machines.findOne();
     num=num.machinenumber
     now="07"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
        if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object'  && count ===1)
       {
         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; 
         
         earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
       }
      
      //The end time will be the time stamp that is from the job submitted right after the first job
       //if the count is 2 then I will need to get the time stamp of the second to latest submitted job
      else if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count >=2)
       {
         var earnedHoursCalc = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       }
            
        if (earnedHoursCalc >=1)
       {
         return "Green"
      }
      else if (earnedHoursCalc <1)
       {

        return "Yellow"
       }



     },
    changeStatus1p: function() {
      num= Machines.findOne();
     num=num.machinenumber
     now="07"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1",CycleTimeStamp: {$gte: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },
    

    changeStatus2: function() {
     num= Machines.findOne();
     num=num.machinenumber
     now="08"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour: now}) === 'object'  && count ===1)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
      
      //The end time will be the time stamp that is from the job submitted right after the first job
      //if the count is 2 then I will need to get the time stamp of the second to latest submitted job
      else if (typeof Parts.findOne({hour: now})=== 'object'  && count >=2)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       
      }
            
       if (earnedHoursCalc >=1)
      {
        return "Green"
      }

      else if (earnedHoursCalc <1)
      {

        return "Yellow"
      }




    },
changeStatus2p: function() {
 
     num= Machines.findOne();
     num=num.machinenumber
     now="08"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },
changeStatus3: function() {
        
    num= Machines.findOne();
     num=num.machinenumber
     now="09"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object'  && count ===1)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; 
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
      
     
      else if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count >=2)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       
      }
            
       if (earnedHoursCalc >=1)
      {
        return "Green"
      }

      else if (earnedHoursCalc <1)
      {

        return "Yellow"
      }




    },
changeStatus3p: function() {
    num= Machines.findOne();
     num=num.machinenumber
     now="09"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },
changeStatus4: function() {
    num= Machines.findOne();
     num=num.machinenumber
     now="10"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object'  && count ===1)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
      
      //The end time will be the time stamp that is from the job submitted right after the first job
      //if the count is 2 then I will need to get the time stamp of the second to latest submitted job
      else if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count >=2)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       
      }
            
       if (earnedHoursCalc >=1)
      {
        return "Green"
      }

      else if (earnedHoursCalc <1)
      {

        return "Yellow"
      }




    },
changeStatus4p: function() {
  num= Machines.findOne();
     num=num.machinenumber
     now="10"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },

changeStatus5: function() {
        num= Machines.findOne();
     num=num.machinenumber
     now="11"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour: now}) === 'object'  && count ===1)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; 
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
      
      //The end time will be the time stamp that is from the job submitted right after the first job
      //if the count is 2 then I will need to get the time stamp of the second to latest submitted job
      else if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count >=2)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       
      }
            
       if (earnedHoursCalc >=1)
      {
        return "Green"
      }

      else if (earnedHoursCalc <1)
      {

        return "Yellow"
      }




    },
changeStatus5p: function() {
  num= Machines.findOne();
     num=num.machinenumber
     now="11"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },
changeStatus6: function() {
    num= Machines.findOne();
     num=num.machinenumber
     now="12"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object'  && count ===1)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
      
      //The end time will be the time stamp that is from the job submitted right after the first job
      //if the count is 2 then I will need to get the time stamp of the second to latest submitted job
      else if (typeof Parts.findOne({hour: now, month:month, day:day})=== 'object'  && count >=2)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       
      }
            
       if (earnedHoursCalc >=1)
      {
        return "Green"
      }

      else if (earnedHoursCalc <1)
      {

        return "Yellow"
      }




    },
changeStatus6p: function() {
 
 num= Machines.findOne();
     num=num.machinenumber
     now="12"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },
 changeStatus7: function() {
    num= Machines.findOne();
     num=num.machinenumber
     now="13"
   month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'object'  && count ===1)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
      
      //The end time will be the time stamp that is from the job submitted right after the first job
      //if the count is 2 then I will need to get the time stamp of the second to latest submitted job
      else if (typeof Parts.findOne({hour: now})=== 'object'  && count >=2)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       
      }
            
       if (earnedHoursCalc >=1)
      {
        return "Green"
      }

      else if (earnedHoursCalc <1)
      {

        return "Yellow"
      }




    },
changeStatus7p: function() {
 
 num= Machines.findOne();
     num=num.machinenumber
     now="13"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },
  changeStatus8: function() {
   num= Machines.findOne();
     num=num.machinenumber
     now="14"
    month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
       if (typeof Parts.findOne({hour: now}) === 'object'  && count ===1)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num, AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ; ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
      
      //The end time will be the time stamp that is from the job submitted right after the first job
      //if the count is 2 then I will need to get the time stamp of the second to latest submitted job
      else if (typeof Parts.findOne({hour: now})=== 'object'  && count >=2)
      {
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment().format("YYYY-MM-DD 07:00:00.000"), $lt: moment(Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS")}}).count() * (Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().cavitation / Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 1}).fetch().pop().quantity) ;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
       
      }
            
       if (earnedHoursCalc >=1)
      {
        return "Green"
      }

      else if (earnedHoursCalc <1)
      {

        return "Yellow"
      }




    },
changeStatus8p: function() {
 
 num= Machines.findOne();
     num=num.machinenumber
     now="14"
     month=moment().format("MM")
    day=moment().format("DD")
      
     count= Parts.find({hour: now, month:month, day:day}).count()
      //the time stamp of the most recent job will be 
      if (typeof Parts.findOne({hour: now})=== 'object'  && count ===2)
      {
        //Part = Parts.find({hour: '12'}).fetch().pop().timestamp
        //I need the time stamp of the most recently submitted job
        //if there are 2 jobs submitted then this 2nd job will start at its time stamp and end at the end of the hour
       
        var earnedHoursCalc = Cycles.find({PressNumber: num,AutoStatus: "1", CycleTimeStamp: {$gte: moment(Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().timestamp).format("YYYY-MM-DD 07:mm:ss.SSS"), $lt: moment().format("YYYY-MM-DD 08:00:00.000")}}).count() * (Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().cavitation / Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop().quantity) *.5;
         
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
         
        
      }
       
       if (earnedHoursCalc >=1 && count>1)
      { 
         
    return "Green"
    
      }

      else if (earnedHoursCalc <1&& count>1)
  {
 
    return "Yellow"
   
 }
      // }
    },     
  part1: function ()
   {
  num= Machines.findOne();
     num=num.machinenumber
     now = "07"
    month=moment().format("MM")
    day=moment().format("DD")
    
 //find the current day
 day= Parts.findOne({hour:now, })
var part =Parts.findOne({hour: now})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }
    
      num= Machines.find().fetch().pop();
     num=num.machinenumber
     
      count = Cycles.find({PressNumber: num,CycleTimeStamp: {$gte: moment(Parts.find().fetch().pop().timestamp.toString()).subtract(60,'seconds').format("YYYY-MM-DD HH:mm:ss.SSS")}}).count()
         estimatedTime = (Number(Parts.find().fetch().pop().quantity) - Number(count))  / Number(Parts.find().fetch().pop().cavitation);
         estimatedTime=estimatedTime * 10; //This 10 is a place holder for the time per cycle
         estimatedminutes=parseInt(estimatedTime/60);
         
          totaltime= Number(Parts.find().fetch().pop().quantity)/Number(Parts.find().fetch().pop().cavitation)
          totaltime = totaltime*10;
         totaltime= parseInt(totaltime/60);
if (estimatedminutes <=0)
{

  estimatedminutes=0;
}         
        
         percent=estimatedminutes/totaltime;
          percent=percent*100;
          percent=parseInt(percent)
         
          if (percent<=0)
          {

           percent=0;
          }
else if (typeof Parts.findOne({hour: now}) === 'undefined' )
{
  
    
    // part =Parts.find({}, {sort: {hour: 1}, limit:1}).fetch().pop();
    part=Parts.find({hour: {$lt: now}}).fetch().pop()
    
  if (typeof Parts.find({hour: {$lt: now}}).fetch().pop() === 'object' && percent >0)
    {
  return part.partnumber
}
   }
     },
   part1p: function ()
   {
   num= Machines.findOne();
     num=num.machinenumber
     now= "07"
    month=moment().format("MM")
    day=moment().format("DD")

count= Parts.find({hour: now}).count()
 var part =Parts.find({hour: now}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }
},


   
   quantity1: function() {
    num= Machines.findOne();
     num=num.machinenumber
     now = "07"
     month=moment().format("MM")
    day=moment().format("DD")
   
var part =Parts.findOne({hour: now})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }
    
     
          
else if (typeof Parts.findOne({hour: now, month:month, day:day}) === 'undefined' )
{
  
    
    // part =Parts.find({}, {sort: {hour: 1}, limit:1}).fetch().pop();
    part=Parts.find({hour: {$lt: now}}).fetch().pop()
    
  if (typeof Parts.find({hour: {$lt: now}}).fetch().pop() === 'object' && percent >0)
    {
  return part.quantity
    }
    }
  },
   
   quantity1p: function() {
 num= Machines.findOne();
     num=num.machinenumber
     now= "07"
    month=moment().format("MM")
    day=moment().format("DD")

count= Parts.find({hour: now, month:month, day:day}).count()
 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour:now}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    },

    part2: function ()
   {
  num= Machines.findOne();
     num=num.machinenumber
     now = "08"
    month=moment().format("MM")
    day=moment().format("DD")
var part =Parts.findOne({hour: now, month:month, day:day})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }

   },
   part2p: function ()
   {
 num= Machines.findOne();
     num=num.machinenumber
     now= "08"
     month=moment().format("MM")
    day=moment().format("DD")
    
      count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour


 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }

},
   
   quantity2: function() {
    num= Machines.findOne();
     num=num.machinenumber
     now= "08"
    month=moment().format("MM")
    day=moment().format("DD")
    
 var part =Parts.findOne({hour: now, month:month, day:day})

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object')
 {
         return part.quantity
   }
      }
    ,
   
   quantity2p: function() {
   num= Machines.findOne();
     num=num.machinenumber
     now= "08"
     month=moment().format("MM")
    day=moment().format("DD")
  count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour

 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    },
  part3: function ()
   {
     num= Machines.findOne();
     num=num.machinenumber
     now = "09"
     month=moment().format("MM")
    day=moment().format("DD")
var part =Parts.findOne({hour: now, month:month, day:day})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }

   },
   part3p: function ()
   {
 num= Machines.findOne();
     num=num.machinenumber
     now= "09"
     month=moment().format("MM")
    day=moment().format("DD")
    
      count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour


 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }


   },
   quantity3: function() {
     num= Machines.findOne();
     num=num.machinenumber
     now= "09"
    month=moment().format("MM")
    day=moment().format("DD")
    
 var part =Parts.findOne({hour: now, month:month, day:day})

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object')
 {
         return part.quantity
   }
      }
    ,
   
   quantity3p: function() {
   num= Machines.findOne();
     num=num.machinenumber
     now= "09"
    month=moment().format("MM")
    day=moment().format("DD")

  
  count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour

 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    },
  part4: function ()
   {

     num= Machines.findOne();
     num=num.machinenumber
     now = "10"
     month=moment().format("MM")
    day=moment().format("DD")
 
var part =Parts.findOne({hour: now, month:month, day:day})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }

   },
   part4p: function ()
   {
 num= Machines.findOne();
     num=num.machinenumber
     now= "10"
      month=moment().format("MM")
    day=moment().format("DD")
    
      count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour


 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }

},
   
   quantity4: function() {
     num= Machines.findOne();
     num=num.machinenumber
     now= "10"
     month=moment().format("MM")
    day=moment().format("DD")


    
 var part =Parts.findOne({hour: now, month:month, day:day})

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object')
 {
         return part.quantity
   }
      }
    ,
   
   quantity4p: function() {
   num= Machines.findOne();
     num=num.machinenumber
     now= "10"
     month=moment().format("MM")
    day=moment().format("DD")

  
  count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour

 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    }, 
   part5: function ()
   {
     num= Machines.findOne();
     num=num.machinenumber
     now = "11"
     month=moment().format("MM")
    day=moment().format("DD")
var part =Parts.findOne({hour: now, month:month, day:day})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }

   },
   part5p: function ()
   { num= Machines.findOne();
     num=num.machinenumber
     now= "11"
     month=moment().format("MM")
    day=moment().format("DD")

    
      count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour


 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }

},
   
   quantity5: function() {
     num= Machines.findOne();
     num=num.machinenumber
     now= "11"
      month=moment().format("MM")
    day=moment().format("DD")
    
 var part =Parts.findOne({hour: now, month:month, day:day})

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object')
 {
         return part.quantity
   }
      }
    ,
   
   quantity5p: function() {
   num= Machines.findOne();
     num=num.machinenumber
     now= "11"
      month=moment().format("MM")
    day=moment().format("DD")

  
  count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour

 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    },
    part6: function ()
   { num= Machines.findOne();
     num=num.machinenumber
     now = "12"
     month=moment().format("MM")
    day=moment().format("DD")
var part =Parts.findOne({hour: now, month:month, day:day})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }

   },
   part6p: function ()
   { num= Machines.findOne();
     num=num.machinenumber
     now= "12"
    month=moment().format("MM")
    day=moment().format("DD")

    
      count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour


 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }

},
   
   quantity6: function() {
     num= Machines.findOne();
     num=num.machinenumber
     now= "12"
    month=moment().format("MM")
    day=moment().format("DD")
    
 var part =Parts.findOne({hour: now, month:month, day:day})

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object')
 {
         return part.quantity
   }
      }
    ,
   
   quantity6p: function() {
   num= Machines.findOne();
     num=num.machinenumber
     now= "12"
     month=moment().format("MM")
    day=moment().format("DD")
  count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour

 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    },
    part7: function ()
   {
     num= Machines.findOne();
     num=num.machinenumber
     now = "13"
     month=moment().format("MM")
    day=moment().format("DD")
 
var part =Parts.findOne({hour: now, month:month, day:day})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }

   },
   part7p: function ()
   { num= Machines.findOne();
     num=num.machinenumber
     now= "13"
    month=moment().format("MM")
    day=moment().format("DD")

    
      count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour


 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }


   },
   quantity7: function() {
     num= Machines.findOne();
     num=num.machinenumber
     now= "13"
      month=moment().format("MM")
    day=moment().format("DD")
    
 var part =Parts.findOne({hour: now, month:month, day:day})

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object')
 {
         return part.quantity
   }
      }
    ,
   
   quantity7p: function() {
   num= Machines.findOne();
     num=num.machinenumber 
     now= "13"
      month=moment().format("MM")
    day=moment().format("DD")

  
  count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour

 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    },
    part8: function ()
   { num= Machines.findOne();
     num=num.machinenumber
     now = "14"
     month=moment().format("MM")
    day=moment().format("DD")
 
var part =Parts.findOne({hour: now, month:month, day:day})


 if(typeof Parts.findOne({hour: now, month:month, day:day}) === 'object')
 {
    return part.partnumber
 }

   },
   part8p: function ()
   {
num= Machines.findOne();
     num=num.machinenumber
     now= "14"
    month=moment().format("MM")
    day=moment().format("DD")
    
      count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour


 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")

if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.partnumber
       
  }


   },
   quantity8: function() {
     num= Machines.findOne();
     num=num.machinenumber
     now= "14"
     month=moment().format("MM")
    day=moment().format("DD")
    
 var part =Parts.findOne({hour: now, month:month, day:day})

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object')
 {
         return part.quantity
   }
      }
    ,
   
   quantity8p: function() {
   num= Machines.findOne();
     num=num.machinenumber
     now= "14"
     month=moment().format("MM")
    day=moment().format("DD")

  
  count= Parts.find({hour: now, month:month, day:day}).count()
//basically I need logic that determines which part number to present.
//This will be easier since I won't be looking at cycles only the position of the part number
//in the parts database each hour

 var part =Parts.find({hour: now, month:month, day:day}).fetch().pop()

// Parts.find({hour: now}).fetch().pop().timestamp.toString()).format("mm")
 
if(typeof Parts.find({hour: now, month:month, day:day}).fetch().pop() === 'object' && count>=2) // this is the last entered item
 {
   part = Parts.find({hour: now, month:month, day:day}, {sort: {minute: 1}, limit: 2}).fetch().pop()
    return part.quantity
        
  }

    },  
 
});


//Figure out the logic for breaking up the job into 24 hours.
//after that only output 8 hour segments of the job



































// Meteor.subscribe('parts-to-access', function () {
//     var test = Parts.find({workcenter: '304A'}).fetch();
//     console.log(test[0].cavitation);
// });
// Meteor.subscribe('PressCycles');
// //console.log("Getting a single entry: "+ Parts.find().count() );

// var start_time = moment().hour(7).format("YYYY-MM-DD hh:mm:ss.SSS");
// console.log(start_time);


// Template.job.helpers({
//     calculateTime: function () {
//         //calculate the amount of time needed for the job
//         var estimatedTime = (partStats.partsPlanned / partStats.cavities) * partStats.partCycleTime;
//         return displayHours = moment().startOf('day').seconds(estimatedTime).format('H:mm:ss');
//     },
//     currentTime: function () {
//         Meteor.call("getCurrentTime", {
//             onResultRecieved: function (err, result) {
//                 console.log("RESULT: " + result);
//             }
//         });
//     },
//     incomingCycles: function () {
//         //grab all cycles from today
//         Meteor.subscribe('cycles-recent', partStats.startTime);
//         return (100 * partStats.cavities);
//     },
//     partsPlanned: function () {
//         return partStats.partsPlanned;
//     },
//     partNumber: function () {
//          return partStats.partNumber;
//     },
//     earnedHours: function () {
//         var earnedHoursCalc = (1 * partStats.cavities) / partStats.partsPlanned;
//         return earnedHoursCalc;
//     },
//     parts: function() {
//     return Parts.find();
//    },
//    columns: function() {
//      // the context is a part
//      var result = _.values(this.data);
//      result.unshift(this.text);
//      return result;
// }
// });