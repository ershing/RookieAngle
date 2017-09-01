import re


def search(string, txt):
    txtToList = txt.replace(',', '').replace('.', '').strip().split(' ')
    testInner = re.findall('\([^\(.*^\)]*\)', string)
    newString = string
    while len(testInner)>0:
        for ind, each in enumerate(testInner):
            toList = re.findall('!?\w+', each)
            for index, val in enumerate(toList):
                testNot = re.match('!(\w+)', val)
                if testNot:
                    val = testNot.group(1)
                    if val not in txtToList:
                        toList[index] = "True"
                    else:
                        toList[index] = "False"
                else:
                    if val == 'True':
                        pass
                    if val == 'False':
                        pass
                    if val in txtToList:
                        toList[index] = "True"
                    else:
                        toList[index] = "False"
            def change(matched):
                toRe = toList[0]
                toList.pop(0)
                return toRe
            testInner[ind] = re.sub('!?\w+', change, each)

            # 先从&符号判断
            while "&" in testInner[ind]:
                matchAnd = re.findall('\w+\s\&\s\w+',testInner[ind])
                for ii,vv in enumerate(matchAnd):
                    if vv == 'False & False':
                        matchAnd[ii] = 'False'
                    elif vv == 'True & True':
                        matchAnd[ii] = 'True'
                    elif vv == 'True & False':
                        matchAnd[ii] = 'False'
                    elif vv == 'False & True':
                        matchAnd[ii] = 'True'
                    else:
                        print('null',vv)
                def changeAnd(matched):
                    toRe = matchAnd[0]
                    matchAnd.pop(0)
                    return toRe
                testInner[ind] = re.sub('\w+\s\&\s\w+', changeAnd, testInner[ind])

            # 再从|符号判断
            while "|" in testInner[ind]:
                matchOr = re.findall('\w+\s\|\s\w+',testInner[ind])
                for ii,vv in enumerate(matchOr):
                    if vv == 'False | False':
                        matchOr[ii] = 'False'
                    elif vv == 'True | True':
                        matchOr[ii] = 'True'
                    elif vv == 'True | False':
                        matchOr[ii] = 'True'
                    elif vv == 'False | True':
                        matchOr[ii] = 'True'
                    else:
                        print('null',vv)
                def changeOr(matched):
                    toRe = matchOr[0]
                    matchOr.pop(0)
                    return toRe
                testInner[ind] = re.sub('\w+\s\|\s\w+', changeOr, testInner[ind])

            #对单一数据去掉括号处理
            if testInner[ind] == '(True)':
                testInner[ind] = 'True'
            elif  testInner[ind] == '(False)':
                testInner[ind] = 'False'
            else:
                print('error,error')

        def changeMix(matched):
            toRe = testInner[0]
            testInner.pop(0)
            return toRe        
        newString = re.sub('\([^\(.*^\)]*\)', changeMix, newString)
        testInner = re.findall('\([^\(.*^\)]*\)', newString)
    
    toList = re.findall('!?\w+', newString)
    for index, val in enumerate(toList):
        testNot = re.match('!(\w+)', val)
        if testNot:
            val = testNot.group(1)
            if val not in txtToList:
                toList[index] = "True"
            else:
                toList[index] = "False"
        else:
            if val == 'True':
                pass
            if val == 'False':
                pass
            if val in txtToList:
                toList[index] = "True"
            else:
                toList[index] = "False"
    def change(matched):
        toRe = toList[0]
        toList.pop(0)
        return toRe
    newString = re.sub('!?\w+', change, newString)

    # 先从&符号判断
    while "&" in newString:
        matchAnd = re.findall('\w+\s\&\s\w+',newString)
        for ii,vv in enumerate(matchAnd):
            if vv == 'False & False':
                matchAnd[ii] = 'False'
            elif vv == 'True & True':
                matchAnd[ii] = 'True'
            elif vv == 'True & False':
                matchAnd[ii] = 'False'
            elif vv == 'False & True':
                matchAnd[ii] = 'True'
            else:
                print('null',vv)
        def changeAnd(matched):
            toRe = matchAnd[0]
            matchAnd.pop(0)
            return toRe
        newString = re.sub('\w+\s\&\s\w+', changeAnd, newString)

    # 再从|符号判断
    while "|" in newString:
        matchOr = re.findall('\w+\s\|\s\w+',newString)
        for ii,vv in enumerate(matchOr):
            if vv == 'False | False':
                matchOr[ii] = 'False'
            elif vv == 'True | True':
                matchOr[ii] = 'True'
            elif vv == 'True | False':
                matchOr[ii] = 'True'
            elif vv == 'False | True':
                matchOr[ii] = 'True'
            else:
                print('null',vv)
        def changeOr(matched):
            toRe = matchOr[0]
            matchOr.pop(0)
            return toRe
        newString = re.sub('\w+\s\|\s\w+', changeOr, newString)

    #对单一数据去掉括号处理
    if newString == '(True)':
        newString = True
    elif  newString == '(False)':
        newString = False
    elif newString == 'True':
        newString = True
    elif   newString == 'False':
        newString = False
    else:
        print('error,error',newString)    
    return newString


# Test sample
txt = 'one apple with two leaves, one is green and the other is yellow.'
s1 = '(apple | others) & two'  # True
s2 = 'one & yellow & leaf'  # False
s3 = '(!three | one & four) & !five'  # True
s4 = '!green & (ones | two)'  # False
s5 = '(big | !apple | the) & ((!yellow | !green) | others)'  # False


print(search(s1, txt),search(s2, txt),search(s3, txt),search(s4, txt),search(s5, txt))
