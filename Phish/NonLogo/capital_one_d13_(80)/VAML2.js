// Copyright 2003, 2004 Peter L. Blum, All Rights Reserved, www.PeterBlum.com
// Professional Validation And More v2.0.3g Level 2


function VAM_EvalDiffCond(pCO)
{
var vVal1 = pCO.ConvVal(pCO, pCO.IDToEval);
var vVal2 = pCO.ConvVal(pCO, pCO.IDToEval2);
if ((vVal1 == null) || (vVal2 == null))
return -1;
var vDiff = Math.abs(vVal1 - vVal2); if ((pCO.OneMult != 0) && (pCO.OneMult != 1))
{
vDiff = vDiff / pCO.OneMult;
vDiff = Math.round(vDiff);
}
pCO.DiffRes = vDiff; return pCO.Comparer(pCO, vDiff, pCO.Diff, pCO.Op) ? 1 : 0;
} 

function VAM_EvalCountChecksCond(pCO)
{
var vCnt = 0;
for (var vJ = 0; vJ < 2; vJ++)
{
var vID = vJ == 0 ? pCO.IDToEval : pCO.IDToEval2;
if (vID != "")
{
var vDone = false;
for (var vI = 0; !vDone; vI++)
{
var vChild = VAM_GetById(vID + '_' + vI);
if (vChild == null) 
vDone = true;
else if (vChild.checked)
vCnt++;
} 
}
} 
pCO.Count = vCnt; return ((pCO.Min <= vCnt) && ((pCO.Max == 0) || (pCO.Max >= vCnt))) ? 1 : 0;
} 

function VAM_EvalCountSelsCond(pCO)
{
var vCnt = 0;
for (var vJ = 0; vJ < 2; vJ++)
{
var vID = vJ == 0 ? pCO.IDToEval : pCO.IDToEval2;
if (vID != "")
{
var vFld = VAM_GetById(vID);
if (vFld.options == null) 
return -1;
for (var vI = 0; vI < vFld.options.length; vI++)
if (vFld.options[vI].selected)
vCnt++;
}
} 
pCO.Count = vCnt; var vMax = (pCO.Max > 0) ? pCO.Max : 99999;
return ((pCO.Min <= vCnt) && (vMax >= vCnt)) ? 1 : 0;
} 

function VAM_EvalCountTrueCond(pCO)
{
if (pCO.Conds.length == 0)
return -1;
var vCnt = 0;
var vCanEval = false;
for (var vI = 0; vI < pCO.Conds.length; vI++)
{
var vR = VAM_EvalCondition(pCO.Conds[vI]);
if (vR == 1)
vCnt++;
if (vR != -1)
vCanEval = true;
} 
pCO.Count = vCnt; if (!vCanEval)
return -1;
return ((pCO.Min <= vCnt) && (pCO.Max >= vCnt)) ? 1 : 0;
} 

function VAM_EvalCCNCond(pCO)
{
var vVal = VAM_GetTextValue(pCO.IDToEval, pCO.Trim);
if (vVal == "") 
return pCO.IBT;
var vLen = vVal.length;
if (vLen < 10)
return 0;
var vRx = new RegExp("^(\\d+)$", "i");
if (!vRx.test(vVal))
return 0;
if (pCO.PfxByLen != null) 
{
var vFd = false; for (var vI = 0; (vI < pCO.PfxByLen.length) && !vFd; vI++)
{
if (pCO.PfxByLen[vI].Len == vLen)
{
vFd = true;
var vRx = new RegExp(pCO.PfxByLen[vI].Pref, "i");
if (!vRx.test(vVal))
return 0; }
} 
if (!vFd) 
return 0;
}
var vT = 0; var vAN = true; for (var vI = vLen - 1; vI >= 0; vI--)
{
var vD = parseInt(vVal.charAt(vI)); if (vAN) 
vT += vD;
else 
{
vD = vD * 2;
if (vD > 9)
vT += 1 + (vD % 10); else
vT += vD;
}
vAN = !vAN;
} 
return vT % 10 == 0 ? 1 : 0;
} 

function VAM_EvalABARtNumCond(pCO)
{
var vVal = VAM_GetTextValue(pCO.IDToEval, pCO.Trim);
if (vVal == "") 
return pCO.IBT;
var vLen = vVal.length;
if (vLen != 9) 
return 0;
var vRx = new RegExp("^(\\d+)$", "i");
if (!vRx.test(vVal))
return 0;
var vT = 0;
var vM = [3, 7, 1];
for (var vI = 0; vI < 9; vI++)
{
vT += parseInt(vVal.charAt(vI)) * vM[vI % 3];
}
return vT % 10 == 0 ? 1 : 0;
} 

function VAM_DiffReplToken(pAO, pText)
{
pText = VAM_TwoFldReplToken(pAO, pText);
return VAM_RERpl(pText, "{DIFFRESULT}", pAO.Cond.DiffRes)
} 

function VAM_CntSelReplToken(pAO, pText)
{
pText = VAM_OneFldReplToken(pAO, pText);
pText = VAM_SPReplToken(pText, pAO.Cond.Count, "COUNT");
return VAM_RERpl(pText, "{COUNT}", pAO.Cond.Count)
} 

function VAM_CntTrueReplToken(pAO, pText)
{
pText = VAM_SPReplToken(pText, pAO.Cond.Count, "COUNT");
return VAM_RERpl(pText, "{COUNT}", pAO.Cond.Count)
} 

function VAM_CntWords(pCO, pText)
{
if (pText.length == 0)
return 0;
pText = pText.replace(new RegExp("'", "gi"), ""); var vRegEx = new RegExp("\\b(\\w+?)\\b", "ig"); var vCnt = 0;
while (vRegEx.exec(pText) != null)
vCnt++;
return vCnt;
} 

var gVAM_CEMActions = null;
function VAM_CEMAddAction(pAO)
{
if (pAO.VT == "CEM")
{
if (gVAM_CEMActions == null)
gVAM_CEMActions = new Array;
gVAM_CEMActions[gVAM_CEMActions.length] = pAO;
pAO.SelErrMsg = VAM_CEMSelErrMsg;
for (var vI = 0; vI < pAO.Val.length; vI++)
{
var vO = pAO.Val[vI];
vO.AO = VAM_FindAOById(vO.FID);
vO.AO.CondResult = vO.AO.IsValid != false ? 1 : 0; }
if (pAO.IsValid == false)
VAM_CEMDoOneAction(pAO);
}
} 

function VAM_CEMDoAction()
{
if (gVAM_CEMActions != null)
{
for (var vI = 0; vI < gVAM_CEMActions.length; vI++)
{
var vAO = gVAM_CEMActions[vI];
VAM_CEMDoOneAction(vAO);
} 
} 
} 
function VAM_CEMDoOneAction(pAO)
{
var vCnt = 0;
pAO.EMsg = ""; var vR = 1; for (var vJ = 0; vJ < pAO.Val.length; vJ++)
{
var vVO = pAO.Val[vJ].AO;
if (vVO.CondResult == 0)
{ 
vR = 0;
var vEM = VAM_GetErrMsg(vVO);
if (vEM != "")
{
if (vCnt > 0)
if (pAO.LS)
{
vEM = pAO.LdTxt + vEM;
pAO.EMsg = pAO.EMsg + pAO.LnBk; }
else
{
pAO.EMsg = pAO.EMsg + pAO.PSep; }
if ((vCnt == 1) && pAO.LS) 
pAO.EMsg = pAO.LdTxt + pAO.EMsg;
pAO.EMsg = pAO.EMsg + vEM;
vCnt++;
} 
} 
} 
VAM_DoValidate(pAO, vR);
} 
function VAM_CEMSelErrMsg(pAO)
{
return pAO.EMsg;
} 
