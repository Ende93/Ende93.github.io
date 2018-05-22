# 10.6 [计算高度和边距](https://www.w3.org/TR/CSS2/visudet.html#Computing_heights_and_margins)
为了计算 `top`，`margin-top`，`height`，`margin-bottom` 和 `bottom` 的值，对各种框进行区分是非常必要的：

1. 内联，非替换元素
2. 内联，替换元素
3. 块级别，一般流中的非替换元素
4. 块级别，一般流中的替换元素
5. 浮动的，非替换的元素
6. 浮动，替换元素
7. 绝对定位，非替换元素
8. 绝对定位，替换元素
9. 行内块，一般流中的非替换元素
10. 行内块，一般流中的替换元素
对于第1-6点和第9-10点，`top` 和 `bottom` 的值由9.4.3节中的规则确定。

> 注意：这些规则适用于根元素，就像任何其他元素一样。

> 注意。 下面计算的 `height` 的使用值是一个试验值，可能需要多次计算，具体取决于 `min-height` 和 `max-height`，请参见下面的[最小高度和最大高度](https://www.w3.org/TR/CSS2/visudet.html#min-max-heights)部分。

## 10.6.1 行内，非替换元素
`height` 属性无效。内容区域的高度应基于字体的高度，但本规范并未指定方式。例如，UA可以使用 `em-box` 或字体的最大上行和下行。（后者将确保高于或低于 `em-box` 部分的字体仍然落在内容区域内，但会导致不同字体的会有不同大小的框;前者将确保作者可以控制相对于 `line-height` 的背景样式，但会导致字形会画在内容区域外。）

> 注意：CSS的第3级可能会包含一个属性，以选择对内容高度使用哪种字体度量。

内联，非替换框的垂直方向的 `pading`，`border` 和 `margin` 从内容区域的顶部和底部开始，与 `line-height` 无关。但是在计算内联框的高度时只使用 `line-height`。

本规范未定义的是——当使用多种字体时的内容区域高度（当在不同字体中找到不同字形时会发生这种情况）。但是，我们建议选择的高度能使得内容区域都能包含元素中所有字体的（1）em-boxes 或（2）最大上行和下行。请注意，这时高度可能比任何字体大小都要大，这取决于各个字体的基线对齐的位置。

## 10.6.2 普通流中的内联可替换、块级可替换和行内块元素及浮动可替换元素

如果 `margin-top`，`margin-bottom` 的值是 `auto`，则使用值为 0。
如果 `height` 和 `width` 的计算值都是 `auto`，且元素也具有固有高度，则该固有高度是 `height` 的使用值。
否则的话， 当 `height` 的计算值是 `auto`，并且元素具有固有比率，则使用的 `height` 值是：
（实际 `width`）/（固有比率）
否则的话， 当 `height` 的计算值是 `auto`，并且该元素具有固有高度，则该固有高度是 `height` 的使用值。

否则，当 `height` 的计算值为 `auto`，但上述条件都不符合，则 `height` 的使用值必须设置为宽高比为2：1的最大矩形的高度， 具有不大于150px的高度，并且具有不大于 `device-width` 的宽度。

## 10.6.3 当 `overflow` 的计算值为 `visible` 时的普通流中的块级非替换元素

此部分也适用当 `overflow` 计算值不为 `visible` 但已显示在界面上的普通流中的块级非替换元素。

如果 `margin-top` 或 `margin-bottom` 的计算值时 `auto`，则它们的使用值为 0。如果 `height` 为 `auto`，则高度取决于元素是否拥有块级别的子元素以及其是否具有 `padding` 或 `border`：

元素的 `height` 是从其顶部内容到下列所述第一个的距离：

1. 如果该框使用一行或多行建立内联格式化上下文，则其为最后一行框的底部边缘；
2. 如果子元素的底部边距不与元素的底部边距一起折叠，则其为同一流中最后一个子元素的底部边缘（可能折叠）
3. 最后一个同一流的子元素的底部边框，且其顶部边距不与元素的底部边距折叠；
4. 否则为零

只考虑正常流程中的子元素（即忽略浮动框和绝对定位的框，并且相对定位的框被认为没有它们的偏移量）。注意，子框可能是一个[匿名块框](https://www.w3.org/TR/CSS2/visuren.html#anonymous-block-level)。

## 10.6.4 绝对定位非替换元素
在本节和下一节的内容中，术语 `static position`（静态位置）大致指的是元素在普通流中的位置。更确切地说，静态位置的 `top` 是从包含块的顶部边缘到某个盒子的顶部边缘的距离，该盒子的 `position` 值是 `static` 和其 `float` 是 `none`，其`float` 值是 `none`。（请注意，由于第9.7节中的规则，这可能还需要为 `display` 假设不同的计算值。）如果该框位于包含块之上，则该值为负值。

但是用户代理实际上并不需要计算该框的尺寸，而是可以自由地去假定它的位置。

为了计算静态位置，`fixed position`（固定定位）元素的包含块是初始包含块而不是视口。

对于绝对定位的元素，`vertical dimensions`（垂直尺寸）的使用值必须满足以下约束条件：

> `top` + `margin-top` + `border-top-width` + `padding-top` + `height` + `padding-bottom` + `border-bottom-width` + `margin-bottom` + `bottom` = 包含块的高度

如果 `top`，`height` 和 `bottom` 三个均为 `auto`，则将 `top` 设置为静态位置，并应用下面编号三的规则。

当三者都不是 `auto`：如果 `margin-top` 和 `margin-bottom` 都是 `auto`，则在额外约束条件下求解方程式，使得两个边距值相等。如果 `margin-top` 或 `margin-bottom` 之一是 `auto`，则解出该值的等式。如果这些值过度受限，则忽略 `bottom` 的值并求解。

否则，请选择适用的以下六个规则之一：
1. `top` 及 `height` 为 `auto` 且 `bottom` 值不是 `auto`，此时高度基于10.6.7节所述，将 `margin-top` 值设置为 `auto`，将 `margin-bottom` 设置为 0，然后求解 `top`。
2. `top` 及 `bottom` 为 `auto` 且 `height` 值不是 `auto`，此时设置 `top` 为静态位置，将 `margin-top` 值设置为 `auto`，将 `margin-bottom` 设置为 0，然后求解 `bottom`。
3. `height` 及 `bottom` 为 `auto` 且 `top` 值不是 `auto`，此时高度基于10.6.7节所述，将 `margin-top` 和 `margin-bottom` 设置为 0，然后求解 `bottom`。
4. `top` 值为 `auto` 且 `height` 和 `bottom` 的值不是 `auto`，此时将 `margin-top` 值设置为 `auto`，将 `margin-bottom` 设置为 0, 然后求解 `top`。
5. `height` 值为 `auto` 且 `top` 和 `bottom` 不是 `auto`，此时将 `margin-top` 设置为 `auto`，将 `margin-bottom` 设置为 0，然后求解 `height`。
6. `bottom` 值为 `auto` 且 `top` 和 `height` 不是 `auto`，此时将 `margin-top` 设置为 `auto`，将 `margin-bottom` 设置为 0，然后求解 `bottom`。
