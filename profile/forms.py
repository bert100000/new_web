#繼承來自於Django的models以方便使用者新增、刪除、修改
from django.forms import ModelForm
from .models import profile,shopcart

class proForm(ModelForm):
    #Meta設定的概念
    class Meta:
        model=profile
        #有哪些欄位要給使用者資訊
        fields= ('title','equipName','attack','defence','lucky','magic','value1','value2','value3')

class changeform(ModelForm):

    class Meta:
        model=profile
        fields=('text','important')
        

class shopcartForm(ModelForm):

    class Meta:
        model=shopcart
        fields=('product_name','price','quantity')


    # def __init__(self, *args, **kwargs):
    #     super(proForm, self).__init__(*args, **kwargs)
    #     self.fields['equipName'].widget.attrs['disabled'] = True
    #     self.fields['attack'].widget.attrs['disabled'] = True
    #     self.fields['defence'].widget.attrs['disabled'] = True
    #     self.fields['lucky'].widget.attrs['disabled'] = True
    #     self.fields['magic'].widget.attrs['disabled'] = True
    #     self.fields['power1'].widget.attrs['disabled'] = True
    #     self.fields['power2'].widget.attrs['disabled'] = True
    #     self.fields['power3'].widget.attrs['disabled'] = True
        